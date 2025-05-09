import { groups, adjectives, nouns } from '@/constants/randomWords';
import { UserRegisterDTO } from '@/dto/user.dto';
export function generateName() {
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];

  return `${adj} ${noun}`;
}

export function generateGroup() {
  const group = groups[Math.floor(Math.random() * groups.length)];

  return group;
}

export const generatedUser: UserRegisterDTO = {
  userName: generateName(),
  userGroup: generateGroup(),
};
