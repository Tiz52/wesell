import { Client } from './client.entity';
import { AuditTrail } from '../../../common/domain/value-objects/audit-trail.value';
import { ClientType } from '../enums/client-type.enum';

describe('Client', () => {
  let client: Client;
  let type: ClientType;
  let auditTrail: AuditTrail;

  beforeEach(() => {
    type = ClientType.PERSON;
  });

  describe('create', () => {
    it('should create a new client', () => {
      client = new Client(type, auditTrail);
      expect(client).toBeDefined();
    });
  });
});
