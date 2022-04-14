import { convertClientIdToName } from '../../../utils';
import { YAMLHandler } from '.';
import YAMLContext from '..';

type ParsedClientGrants = {
  clientGrants: unknown[];
};

async function parse(context: YAMLContext): Promise<ParsedClientGrants> {
  // nothing to do, set default empty
  return {
    clientGrants: context.assets.clientGrants,
  };
}

async function dump(context: YAMLContext): Promise<ParsedClientGrants | {}> {
  const { clientGrants } = context.assets;

  // Nothing to do
  if (!clientGrants) return {};

  // Convert client_id to the client name for readability
  return {
    clientGrants: clientGrants.map((grant) => {
      const dumpGrant = { ...grant };
      dumpGrant.client_id = convertClientIdToName(dumpGrant.client_id, context.assets.clients);
      return dumpGrant;
    }),
  };
}

const clientGrantsHandler: YAMLHandler<ParsedClientGrants> = {
  parse,
  dump,
};

export default clientGrantsHandler;