import { company, datatype, internet, lorem } from 'faker';

type Overrides = Record<string, any>;

export const userGenerator = (overrides?: Overrides) => ({
  id: datatype.uuid(),
  firstName: internet.userName(),
  lastName: internet.userName(),
  email: internet.email(),
  password: internet.password(),
  teamId: datatype.uuid(),
  teamName: company.companyName(),
  role: 'ADMIN',
  bio: lorem.sentence(),
  dateCreated: new Date().toISOString(),
  dateUpdated: new Date().toISOString(),
  ...overrides,
});
