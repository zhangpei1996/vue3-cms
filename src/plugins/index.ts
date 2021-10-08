import { App } from 'vue';
import elementPlus from './element-plus';
import registerProperties from './register-properties';

export default {
  install(app: App): void {
    app.use(elementPlus);
    app.use(registerProperties);
  }
};
