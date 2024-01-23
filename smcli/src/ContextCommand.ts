import { Command, Flags } from '@oclif/core';
import { readYaml, writeYaml, createCliEvent } from './path-to-utils';

interface CustomContext {
  obj: {
    runtimeEnv: string;
    config: Record<string, any>;
    // Добавьте другие поля, если они могут быть в контексте
  };
}

export default abstract class BaseCommand extends Command {
  static flags = {
    config: Flags.string({
      default: 'config.yaml',
      description: 'Path to config file',
    }),
    disableTelemetry: Flags.boolean({
      default: false,
      description: 'Disable telemetry',
    }),
    env: Flags.string({
      default: 'production',
      description: 'Environment',
    }),
    telemetryUrl: Flags.string({
      description: 'Telemetry URL',
    }),
  };

  protected async init(): Promise<void> {
    const { flags } = this.parse(BaseCommand);
    this.ensureObjectInContext(flags);
    await this.setupTelemetry(flags);
  }

  private ensureObjectInContext(flags: Record<string, any>): void {
    this.context.ensureObject<CustomContext>({ obj: { runtimeEnv: flags.env, config: {} } });
  }

  private async setupTelemetry(flags: Record<string, any>): Promise<void> {
    const config = readYaml(flags.config);

    if (!config) {
      const defaultConfig = {
        user: { anonymous_id: process.env.ANONYMOUS_ID || uuid.v4() },
      };
      writeYaml(defaultConfig, flags.config);
    }

    if (config.enable_telemetry === 'false') {
      flags.disableTelemetry = true;
    }

    if (!flags.disableTelemetry) {
      const url = config.telemetry_url || flags.telemetryUrl;
      await createCliEvent(url, { user: config.user || {} });
    } else {
      this.log('Telemetry is disabled');
    }

    this.context.obj.config = config;
  }
}
