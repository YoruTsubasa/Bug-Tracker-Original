import {User} from "./user";
import {Ticket} from "./ticket";

export class Project {
  name: string = '';
  description: string = '';
  usersOnProject: User[] = [];
  tickets: Ticket[] = [];

  constructor(name: string, description: string, usersOnProject: User[], tickets: Ticket[]) {
    this.name = name;
    this.description = description;
    this.usersOnProject = usersOnProject;
    this.tickets = tickets;
  }
}
