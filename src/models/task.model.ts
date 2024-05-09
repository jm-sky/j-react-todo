import dayjs from 'dayjs';

export interface ITaskJson {
  id: string
  title: string
  isDone: boolean
  dueDate?: string
  doneDate?: string
  createdAt: string
}

export interface ITask {
  id?: string
  title: string
  isDone?: boolean
  dueDate?: Date | null
  doneDate?: Date | null
  createdAt?: Date
}

export class Task implements ITask {
  id: string;
  title: string;
  isDone?: boolean;
  dueDate?: Date | null;
  doneDate?: Date | null;
  createdAt: Date;

  private constructor(payload: ITask) {
    this.id = payload.id ?? self.crypto.randomUUID();
    this.title = payload.title;
    this.isDone = payload.isDone ?? false;
    this.dueDate = payload.dueDate ?? null;
    this.doneDate = payload.doneDate ?? null;
    this.createdAt = payload.createdAt ?? new Date();
  }

  static create(payload: ITask): Task {
    return new Task(payload);
  }

  static fromJson(json: ITaskJson): Task {
    return new Task({
      ...json,
      dueDate: json.dueDate ? dayjs(json.dueDate).toDate() : null,
      doneDate: json.doneDate ? dayjs(json.doneDate).toDate() : null,
      createdAt: dayjs(json.createdAt).toDate(),
    });
  }
}
