import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import AppError from '@shared/errors/AppError';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();

    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository,
    );
  });
  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 4, 10, 12).getTime();
    });

    const appointment = await createAppointment.execute({
      date: new Date(2021, 4, 10, 13),
      user_id: '123456',
      provider_id: '1234856',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('1234856');
  });

  it('should no be able to create two appointments on the same time', async () => {
    const appointmentDate = new Date(2021, 11, 20, 12);

    await createAppointment.execute({
      date: appointmentDate,
      user_id: '123456',
      provider_id: '1234856',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        user_id: '123456',
        provider_id: '1234856',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should no be able to create an appointments on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 4, 10, 11).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2021, 4, 10, 10),
        user_id: '978',
        provider_id: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should no be able to create an appointment with same user as provider', async () => {
    await expect(
      createAppointment.execute({
        date: new Date(2021, 11, 20, 10),
        user_id: '123123',
        provider_id: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should no be able to create an appointment before 8am and after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 11, 20, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2021, 11, 21, 7),
        user_id: '978',
        provider_id: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        date: new Date(2021, 11, 21, 18),
        user_id: '978',
        provider_id: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
