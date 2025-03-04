import { Pipe, PipeTransform } from '@angular/core';
import { IUser } from '../../../shared/interfaces';

@Pipe({
    name: 'fullname'
})

export class NamePipe implements PipeTransform {
    transform(user: IUser): string {
        const {first_name, last_name} = user;
        return `${first_name} ${last_name}`;
    }
}