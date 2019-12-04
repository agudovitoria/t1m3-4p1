import { RuntimeException } from '@nestjs/core/errors/exceptions/runtime.exception';
import { Logger } from '@nestjs/common';
import { execute } from './scripts/execute';

const ONE_COMMAND_ARGUMENTS = 3;
const isNotSingleArgument = process.argv.length !== ONE_COMMAND_ARGUMENTS;

if (isNotSingleArgument) {
  throw new RuntimeException('Invalid parameters. Use `ts-node index.ts [ populate | clean ]`');
}

execute().catch(error => Logger.error(error));
