import { BlockSchema } from "./block";

type PageLayout = "default";

/**
 * 页面配置
 */
interface PageSchema {
  /**
   * 页面布局
   */
  layout: PageLayout;
  /**
   * 页面内容
   */
  blocks: BlockSchema[];
}

export { PageSchema };
