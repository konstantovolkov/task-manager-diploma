import { Subject } from './Subject.model';
import { Service } from '../Base/Service';
import { getRepository } from 'typeorm';

export class SubjectService implements Service<Subject> {
  async getById(id: number): Promise<Subject> {
    const subject = await getRepository(Subject).findOne(id);

    if (subject) {
      return subject;
    }

    throw new Error('Subject not found');
  }
  async getList(): Promise<Subject[]> {
    return await getRepository(Subject).find();
  }

  async create({ description, title }: Subject): Promise<Subject> {
    const newSubject = new Subject();
    newSubject.title = title;
    newSubject.description = description;

    return await getRepository(Subject).save(newSubject);
  }

  async update({ id, description, title }: Subject): Promise<Subject> {
    const subjectRepository = getRepository(Subject);
    const updatedSubject = await this.getById(id);

    updatedSubject.description = description;
    updatedSubject.title = title;

    return await subjectRepository.save(updatedSubject);
  }

  async delete(id: number): Promise<void> {
    const subject = await this.getById(id)

    getRepository(Subject).delete(subject.id);

  }

  async exists(id: number): Promise<boolean> {
    return !!await this.getById(id);
  }
}
