import {Task} from '../models/task.model';

/**
 * This file serves only as the replacement of backend responses
 * In real projects, you will have actual API calls
 * Which should work very similar
 */
export const task1: Task = {
  uuid: '3a3e4c38-5b0b-4f70-b37f-6a1429f67e88',
  name: 'Task 1',
  dueDate: new Date().getTime() + 86400000, // Due in 1 day
  finished: false,
};

export const task2: Task = {
  uuid: 'a3b7c79f-8373-4f9a-bf3f-9c8a2e03d462',
  name: 'Task 2',
  dueDate: new Date().getTime() + 172800000, // Due in 2 days
  finished: true,
};

export const task3: Task = {
  uuid: 'b8aeb5bb-e1c2-4bde-a2d2-bf32dbb0c321',
  name: 'Task 3',
  dueDate: new Date().getTime() + 259200000, // Due in 3 days
  finished: false,
};

export const task4: Task = {
  uuid: '1b9a8d9f-d8c2-4e58-b62b-48d57ac6c828',
  name: 'Task 4',
  dueDate: new Date().getTime() + 432000000, // Due in 5 days
  finished: true,
};

export const task5: Task = {
  uuid: 'e5fdad63-bbd9-4fd2-b268-b179f60e8578',
  name: 'Task 5',
  dueDate: new Date().getTime() + 604800000, // Due in 7 days
  finished: false,
};

// Tasks arrays
export const tasksVersion1: Task[] = [task1, task2, task3];

export const tasksVersion2: Task[] = [task4, task5];
