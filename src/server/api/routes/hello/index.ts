import { eq } from 'drizzle-orm';
import { Elysia, t } from 'elysia';
import { db } from '~/server/db';
import {
  hello,
  helloInsertSchema,
  helloSelectSchema,
} from '~/server/db/schemas';

export default new Elysia({ prefix: '/hello' })
  .get('', async () => await db.query.hello.findMany())
  .post('', async ({ body }) => await db.insert(hello).values(body), {
    body: helloInsertSchema,
  })
  .delete(
    '/:id',
    async ({ params }) => await db.delete(hello).where(eq(hello.id, params.id)),
    { params: t.Pick(helloSelectSchema, ['id']) },
  );
