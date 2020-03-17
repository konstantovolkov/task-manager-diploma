import express, { Request, Response } from 'express';
import { RouteController } from '../Base/RouteController';
import { SubjectService } from './Subject.service';

export class SubjectController extends RouteController<SubjectService> {
  init(): void {
    this.service = new SubjectService();

    throw new Error('Method not implemented.');
  }
}
