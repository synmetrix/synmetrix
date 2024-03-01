CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  amount integer,
  created_at timestamp without time zone
);
CREATE INDEX orders_created_at_amount ON orders(created_at, amount);
INSERT INTO orders (created_at, amount)
SELECT 
  created_at, 
  floor((1000 + 500*random())*log(row_number() over())) as amount 
FROM generate_series
  ( '1997-01-01'::date
  , '2017-12-31'::date
  , '1 minutes'::interval) created_at