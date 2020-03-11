import { IUser, IUsers } from './User.interface';

const users: IUser[] = [
  {
    id: 1,
    firstName: 'Andrew',
    lastName: 'Ivanov',
    email: 'andrewivanov@mail.com',
    userType: 'student'
  },
  {
    id: 2,
    firstName: 'Bob',
    lastName: 'Smith',
    email: 'bobsmith@mail.com',
    userType: 'student'
  },
  {
    id: 3,
    firstName: 'Richard',
    lastName: 'Drew',
    email: 'richdrew@mail.com',
    userType: 'mentor'
  }
];

const byId = (stored: IUsers, current: IUser) => ({
  ...stored,
  [current.id]: current
});

const usersRepository: IUsers = users.reduce(byId, {});

export const findAll = async (): Promise<IUsers> => {
  return usersRepository;
};

export const findById = async (id: number): Promise<IUser> => {
  const user = usersRepository[id];

  if (user) {
    return user;
  }

  throw new Error('User not found');
};

export const create = async (newUser: IUser): Promise<void> => {
  const id =
    Math.max(...Object.keys(usersRepository).map(id => Number.parseInt(id))) +
    1;

  console.log(newUser);
  usersRepository[id] = {
    ...newUser,
    id
  };
};

export const update = async (updatedUser: IUser): Promise<void> => {
  if (usersRepository[updatedUser.id]) {
    usersRepository[updatedUser.id] = updatedUser;
    return;
  }

  throw new Error('User not found');
};

export const remove = async (id: number): Promise<void> => {
  const user: IUser = usersRepository[id];

  if (user) {
    delete usersRepository[id];
    return;
  }

  throw new Error('User not found');
};
