alter table "public"."x_assistants" 
  add column "product_id" uuid references "public"."products"("id") on delete set null;

comment on column "public"."x_assistants"."product_id" is '关联的产品ID'; 