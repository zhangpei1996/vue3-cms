import { App } from 'vue';
import {
  ElButton,
  ElTabs,
  ElTabPane,
  ElForm,
  ElFormItem,
  ElInput,
  ElCheckbox,
  ElLink,
  ElContainer,
  ElHeader,
  ElMain,
  ElAside,
  ElMenu,
  ElSubMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElResult,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElAvatar,
  ElRow,
  ElCol,
  ElSelect,
  ElOption,
  ElDatePicker,
  ElTable,
  ElTableColumn,
  ElSwitch,
  ElPagination,
  ElImage,
  ElDialog,
  ElTree,
  ElCard
} from 'element-plus';

export default {
  install(app: App): void {
    app.use(ElButton);
    app.use(ElTabs);
    app.use(ElForm);
    app.use(ElInput);
    app.use(ElCheckbox);
    app.use(ElLink);
    app.use(ElContainer);
    app.use(ElMenu);
    app.use(ElResult);
    app.use(ElBreadcrumb);
    app.use(ElDropdown);
    app.use(ElAvatar);
    app.use(ElRow);
    app.use(ElCol);
    app.use(ElSelect);
    app.use(ElDatePicker);
    app.use(ElTable);
    app.use(ElSwitch);
    app.use(ElPagination);
    app.use(ElImage);
    app.use(ElDialog);
    app.use(ElTree);
    app.use(ElCard);
  }
};
