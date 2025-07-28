-- Thêm cột gender vào bảng customer
ALTER TABLE IF EXISTS public.customer
ADD COLUMN gender varchar(10);
