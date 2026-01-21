import type { NameOptions } from './types';

export const getNameOptions = (name: string) => {
    const hasTitle = name.split(' ')[0].includes('.');
      if(hasTitle){
        const [title, firstName, ...lastName] = name.split(' ');
        return {title, firstName, lastName: lastName.join(' ')};
      }
      else{
        const [firstName, ...lastName] = name.split(' ');
        return {firstName, lastName: lastName.join(' ')};
    }
  };
  
  export const formatName = ({title = '', firstName, lastName}: NameOptions) => {
    return `${lastName}, ${firstName} ${title && '(' + title + ')'}`;
  }