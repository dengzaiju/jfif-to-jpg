export interface AppConfig {
  environment: string;
  api: {
    baseUrl: string;
    timeout: number;
    retryAttempts: number;
  };
  features: {
    debug: boolean;
    logging: string;
    analytics: boolean;
  };
  upload: {
    maxFileSize: number;
    maxTotalSize: number;
    allowedTypes: string[];
  };
  conversion: {
    defaultQuality: number;
    defaultFormat: string;
    maxConcurrent: number;
  };
  storage: {
    type: string;
    cleanupInterval: number;
  };
  ui: {
    theme: string;
    language: string;
    showTutorial: boolean;
  };
  performance?: {
    enableCaching: boolean;
    enableCompression: boolean;
    cdnEnabled: boolean;
  };
  security?: {
    enableCSP: boolean;
    enableHSTS: boolean;
    enableXSSProtection: boolean;
  };
}

class ConfigManager {
  private config: AppConfig | null = null;
  private environment: string;

  constructor() {
    this.environment = process.env.NODE_ENV || 'development';
  }

  async loadConfig(): Promise<AppConfig> {
    if (this.config) {
      return this.config;
    }

    try {
      const configPath = `./config/config.${this.environment}.json`;
      const response = await fetch(configPath);
      
      if (!response.ok) {
        throw new Error(`Failed to load config: ${response.statusText}`);
      }

      this.config = await response.json();
      return this.config;
    } catch (error) {
      console.error('Error loading config:', error);
      // 返回默认配置
      return this.getDefaultConfig();
    }
  }

  getConfig(): AppConfig | null {
    return this.config;
  }

  getEnvironment(): string {
    return this.environment;
  }

  isDevelopment(): boolean {
    return this.environment === 'development';
  }

  isProduction(): boolean {
    return this.environment === 'production';
  }

  private getDefaultConfig(): AppConfig {
    return {
      environment: 'development',
      api: {
        baseUrl: 'http://localhost:8787',
        timeout: 30000,
        retryAttempts: 3
      },
      features: {
        debug: true,
        logging: 'debug',
        analytics: false
      },
      upload: {
        maxFileSize: 10485760,
        maxTotalSize: 104857600,
        allowedTypes: ['image/jpeg', 'image/jfif', 'image/png', 'image/bmp', 'image/gif', 'image/webp']
      },
      conversion: {
        defaultQuality: 90,
        defaultFormat: 'jpg',
        maxConcurrent: 5
      },
      storage: {
        type: 'local',
        cleanupInterval: 3600000
      },
      ui: {
        theme: 'light',
        language: 'zh-CN',
        showTutorial: true
      }
    };
  }
}

// 创建全局配置管理器实例
export const configManager = new ConfigManager();

// 导出配置类型和默认值
export type { AppConfig };
export { ConfigManager }; 