import { Hono } from 'hono';
interface Env {
    ENVIRONMENT?: string;
    IMAGES_BUCKET: any;
}
declare const app: Hono<{
    Bindings: Env;
}, import("hono/types").BlankSchema, "/">;
export default app;
//# sourceMappingURL=index.d.ts.map