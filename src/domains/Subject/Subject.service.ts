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

  async update(subject: Subject): Promise<Subject> {
    const subjectRepository = getRepository(Subject);

    const oldSubject = await subjectRepository.findOne(subject.id);
    if (oldSubject) {
      const { title, description } = oldSubject;
      const updatedSubject = new Subject();

      updatedSubject.title = title;
      updatedSubject.description = description;

      return await subjectRepository.save(updatedSubject);
    }

    throw new Error('Subject not found');
  }

  async delete(id: number): Promise<void> {
    const subjectRepository = getRepository(Subject);
    const subject = subjectRepository.findOne(id);

    if (subject) {
      await subjectRepository.delete(id);
    }

    throw new Error('Subject not found');
  }
}
