-- ── 1. CREATE TABLES ──────────────────────────────────────────

create table if not exists customers (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  email        text not null unique,
  country      text not null,
  total_spent  numeric default 0,
  orders_count integer default 0,
  created_at   timestamptz default now()
);

create table if not exists orders (
  id             uuid primary key default gen_random_uuid(),
  customer_name  text not null,
  customer_email text not null,
  product        text not null,
  category       text not null,
  amount         numeric not null,
  status         text not null default 'completed'
                   check (status in ('completed','pending','refunded','cancelled')),
  created_at     timestamptz default now()
);

create table if not exists daily_metrics (
  id               uuid primary key default gen_random_uuid(),
  date             date unique not null,
  revenue          numeric not null,
  orders           integer not null,
  new_customers    integer not null,
  conversion_rate  numeric not null
);

-- ── 2. RLS ────────────────────────────────────────────────────

alter table customers    enable row level security;
alter table orders       enable row level security;
alter table daily_metrics enable row level security;

-- Only authenticated users can read
create policy "Auth read customers"     on customers     for select to authenticated using (true);
create policy "Auth read orders"        on orders        for select to authenticated using (true);
create policy "Auth read daily_metrics" on daily_metrics for select to authenticated using (true);

-- ── 3. SEED — 90 days of data ─────────────────────────────────

-- Customers
insert into customers (name, email, country, total_spent, orders_count, created_at) values
('Emily Chen',      'emily.chen@email.com',     'United States',  4820.50,  14, now() - interval '88 days'),
('James Okafor',    'james.ok@email.com',        'Nigeria',        2340.00,   7, now() - interval '80 days'),
('Sophie Müller',   'sophie.m@gmail.com',        'Germany',        5980.75,  18, now() - interval '75 days'),
('Luca Rossi',      'luca.rossi@email.it',       'Italy',          1200.00,   4, now() - interval '70 days'),
('Aisha Patel',     'aisha.patel@email.com',     'United Kingdom', 3450.25,  11, now() - interval '65 days'),
('Carlos Mendez',   'cmendez@correo.mx',         'Mexico',         870.00,    3, now() - interval '60 days'),
('Yuki Tanaka',     'yuki.t@email.jp',           'Japan',          6210.00,  19, now() - interval '58 days'),
('Amara Diallo',    'amara.d@email.com',         'France',         2100.50,   7, now() - interval '55 days'),
('Noah Williams',   'noah.w@email.com',          'United States',  3890.00,  12, now() - interval '50 days'),
('Fatima Al-Sayed', 'fatima.s@email.ae',         'UAE',            7200.00,  22, now() - interval '45 days'),
('Ravi Sharma',     'ravi.sharma@email.in',      'India',          1560.00,   5, now() - interval '40 days'),
('Olivia Brown',    'olivia.b@email.com',        'Canada',         4100.25,  13, now() - interval '35 days'),
('Diego Torres',    'diego.t@email.com',         'Spain',          680.00,    2, now() - interval '30 days'),
('Mei Lin',         'mei.lin@email.cn',          'China',          5430.75,  16, now() - interval '25 days'),
('Samuel Adeyemi',  'sam.adeyemi@email.com',     'Nigeria',        920.00,    3, now() - interval '20 days'),
('Chloe Dupont',    'chloe.d@email.fr',          'France',         2780.50,   9, now() - interval '15 days'),
('Ethan Park',      'ethan.park@email.kr',       'South Korea',    3320.00,  10, now() - interval '10 days'),
('Isabella Costa',  'isa.costa@email.br',        'Brazil',         1890.25,   6, now() - interval  '7 days'),
('Marcus Johnson',  'marcus.j@email.com',        'United States',  4560.00,  14, now() - interval  '4 days'),
('Priya Nair',      'priya.nair@email.in',       'India',          2230.75,   7, now() - interval  '2 days');

-- Daily metrics (90 days)
insert into daily_metrics (date, revenue, orders, new_customers, conversion_rate) values
(current_date - 89, 1820, 12, 1, 2.8), (current_date - 88, 2140, 15, 2, 3.1),
(current_date - 87, 1650, 11, 1, 2.6), (current_date - 86, 2380, 17, 2, 3.4),
(current_date - 85, 1920, 13, 1, 2.9), (current_date - 84, 2700, 19, 3, 3.6),
(current_date - 83, 1450, 10, 1, 2.4), (current_date - 82, 2100, 14, 2, 3.0),
(current_date - 81, 2560, 18, 2, 3.5), (current_date - 80, 1880, 13, 1, 2.8),
(current_date - 79, 3100, 22, 3, 4.0), (current_date - 78, 2240, 15, 2, 3.2),
(current_date - 77, 1720, 12, 1, 2.7), (current_date - 76, 2890, 20, 3, 3.7),
(current_date - 75, 2100, 14, 2, 3.1), (current_date - 74, 1640, 11, 1, 2.5),
(current_date - 73, 3240, 23, 4, 4.2), (current_date - 72, 2480, 17, 2, 3.4),
(current_date - 71, 1900, 13, 1, 2.8), (current_date - 70, 2700, 19, 3, 3.6),
(current_date - 69, 2080, 14, 2, 3.0), (current_date - 68, 3500, 25, 4, 4.5),
(current_date - 67, 1760, 12, 1, 2.6), (current_date - 66, 2920, 20, 3, 3.8),
(current_date - 65, 2340, 16, 2, 3.3), (current_date - 64, 1680, 11, 1, 2.5),
(current_date - 63, 3080, 21, 3, 4.1), (current_date - 62, 2560, 18, 2, 3.5),
(current_date - 61, 1940, 13, 2, 2.9), (current_date - 60, 2800, 19, 3, 3.7),
(current_date - 59, 2120, 14, 2, 3.1), (current_date - 58, 3620, 25, 4, 4.6),
(current_date - 57, 1840, 12, 1, 2.7), (current_date - 56, 3040, 21, 3, 4.0),
(current_date - 55, 2460, 17, 2, 3.4), (current_date - 54, 1720, 12, 1, 2.6),
(current_date - 53, 3280, 23, 3, 4.3), (current_date - 52, 2680, 18, 2, 3.6),
(current_date - 51, 2000, 14, 2, 3.0), (current_date - 50, 2940, 20, 3, 3.8),
(current_date - 49, 2200, 15, 2, 3.2), (current_date - 48, 3760, 26, 4, 4.7),
(current_date - 47, 1900, 13, 1, 2.8), (current_date - 46, 3160, 22, 3, 4.1),
(current_date - 45, 2580, 18, 2, 3.5), (current_date - 44, 1780, 12, 1, 2.7),
(current_date - 43, 3400, 24, 4, 4.4), (current_date - 42, 2800, 19, 3, 3.7),
(current_date - 41, 2060, 14, 2, 3.1), (current_date - 40, 3060, 21, 3, 4.0),
(current_date - 39, 2300, 16, 2, 3.3), (current_date - 38, 3900, 27, 5, 4.8),
(current_date - 37, 1980, 14, 2, 2.9), (current_date - 36, 3280, 23, 3, 4.2),
(current_date - 35, 2700, 19, 3, 3.6), (current_date - 34, 1860, 13, 1, 2.8),
(current_date - 33, 3560, 25, 4, 4.5), (current_date - 32, 2940, 20, 3, 3.8),
(current_date - 31, 2160, 15, 2, 3.2), (current_date - 30, 3180, 22, 3, 4.1),
(current_date - 29, 2400, 17, 2, 3.4), (current_date - 28, 4060, 28, 5, 5.0),
(current_date - 27, 2060, 14, 2, 3.0), (current_date - 26, 3420, 24, 4, 4.3),
(current_date - 25, 2820, 20, 3, 3.7), (current_date - 24, 1940, 13, 2, 2.9),
(current_date - 23, 3700, 26, 4, 4.6), (current_date - 22, 3060, 21, 3, 4.0),
(current_date - 21, 2240, 15, 2, 3.3), (current_date - 20, 3320, 23, 4, 4.2),
(current_date - 19, 2520, 18, 3, 3.5), (current_date - 18, 4200, 29, 5, 5.1),
(current_date - 17, 2140, 15, 2, 3.1), (current_date - 16, 3560, 25, 4, 4.5),
(current_date - 15, 2960, 20, 3, 3.8), (current_date - 14, 2020, 14, 2, 3.0),
(current_date - 13, 3840, 27, 5, 4.7), (current_date - 12, 3180, 22, 3, 4.1),
(current_date - 11, 2320, 16, 2, 3.4), (current_date - 10, 3460, 24, 4, 4.4),
(current_date -  9, 2640, 18, 3, 3.6), (current_date -  8, 4380, 30, 5, 5.2),
(current_date -  7, 2220, 15, 2, 3.2), (current_date -  6, 3700, 26, 4, 4.6),
(current_date -  5, 3100, 21, 3, 4.0), (current_date -  4, 2100, 14, 2, 3.1),
(current_date -  3, 3980, 28, 5, 4.8), (current_date -  2, 3320, 23, 4, 4.2),
(current_date -  1, 2460, 17, 3, 3.5), (current_date,      3600, 25, 4, 4.4);

-- Orders (50 realistic orders)
insert into orders (customer_name, customer_email, product, category, amount, status, created_at) values
('Emily Chen',     'emily.chen@email.com',  'Pro Wireless Headphones',  'Electronics',  189.99, 'completed', now()-interval '85 days'),
('Sophie Müller',  'sophie.m@gmail.com',    'Ergonomic Office Chair',   'Furniture',    449.00, 'completed', now()-interval '82 days'),
('Yuki Tanaka',    'yuki.t@email.jp',       'Standing Desk Pro',        'Furniture',    699.00, 'completed', now()-interval '80 days'),
('Fatima Al-Sayed','fatima.s@email.ae',     '4K Webcam Ultra',          'Electronics',  229.99, 'completed', now()-interval '78 days'),
('Noah Williams',  'noah.w@email.com',      'Mechanical Keyboard TKL',  'Electronics',  149.99, 'completed', now()-interval '75 days'),
('Olivia Brown',   'olivia.b@email.com',    'Leather Laptop Bag',       'Accessories',  119.00, 'completed', now()-interval '73 days'),
('Emily Chen',     'emily.chen@email.com',  'USB-C Hub 11-in-1',        'Electronics',   79.99, 'completed', now()-interval '70 days'),
('James Okafor',   'james.ok@email.com',    'Smart LED Desk Lamp',      'Electronics',   89.99, 'completed', now()-interval '68 days'),
('Mei Lin',        'mei.lin@email.cn',      'Noise-Cancelling Earbuds', 'Electronics',  159.99, 'completed', now()-interval '65 days'),
('Aisha Patel',    'aisha.patel@email.com', 'Monitor Privacy Screen',   'Accessories',   59.99, 'completed', now()-interval '62 days'),
('Marcus Johnson', 'marcus.j@email.com',   'Dual Monitor Arm',         'Furniture',    129.99, 'completed', now()-interval '60 days'),
('Fatima Al-Sayed','fatima.s@email.ae',     'Gaming Chair Executive',   'Furniture',    549.00, 'completed', now()-interval '58 days'),
('Sophie Müller',  'sophie.m@gmail.com',    'Portable SSD 2TB',         'Electronics',  119.99, 'completed', now()-interval '55 days'),
('Yuki Tanaka',    'yuki.t@email.jp',       'Smart Home Hub',           'Electronics',  199.99, 'completed', now()-interval '52 days'),
('Chloe Dupont',   'chloe.d@email.fr',      'Artisan Desk Mat XL',      'Accessories',   69.99, 'completed', now()-interval '50 days'),
('Ethan Park',     'ethan.park@email.kr',   'Wireless Charging Pad',    'Electronics',   49.99, 'completed', now()-interval '48 days'),
('Emily Chen',     'emily.chen@email.com',  'Cable Management Box',     'Accessories',   34.99, 'completed', now()-interval '45 days'),
('Ravi Sharma',    'ravi.sharma@email.in',  'Laptop Stand Aluminium',   'Accessories',   79.99, 'completed', now()-interval '43 days'),
('Noah Williams',  'noah.w@email.com',      'Ring Light 18 inch',       'Electronics',  109.99, 'completed', now()-interval '40 days'),
('Isabella Costa', 'isa.costa@email.br',    'Smart Planner App Sub',    'Software',      49.99, 'completed', now()-interval '38 days'),
('Olivia Brown',   'olivia.b@email.com',    'Ergonomic Mouse Vertical', 'Electronics',   69.99, 'completed', now()-interval '35 days'),
('Fatima Al-Sayed','fatima.s@email.ae',     'Ultrawide Monitor 34"',    'Electronics',  899.00, 'completed', now()-interval '33 days'),
('Mei Lin',        'mei.lin@email.cn',      'Leather Desk Organiser',   'Accessories',   89.99, 'completed', now()-interval '30 days'),
('James Okafor',   'james.ok@email.com',    'VPN Subscription 1yr',     'Software',      79.99, 'completed', now()-interval '28 days'),
('Aisha Patel',    'aisha.patel@email.com', 'Portable Monitor 15.6"',   'Electronics',  249.99, 'completed', now()-interval '25 days'),
('Marcus Johnson', 'marcus.j@email.com',   'Smart Coffee Mug',         'Accessories',   59.99, 'completed', now()-interval '23 days'),
('Sophie Müller',  'sophie.m@gmail.com',    'Pixel Art Display Frame',  'Accessories',  139.99, 'completed', now()-interval '20 days'),
('Ethan Park',     'ethan.park@email.kr',   'Mechanical Pencil Pro',    'Accessories',   29.99, 'completed', now()-interval '18 days'),
('Yuki Tanaka',    'yuki.t@email.jp',       'RGB Mouse Pad XL',         'Accessories',   44.99, 'completed', now()-interval '15 days'),
('Priya Nair',     'priya.nair@email.in',   'Cloud Storage 1yr',        'Software',      99.99, 'completed', now()-interval '13 days'),
('Emily Chen',     'emily.chen@email.com',  'Webcam Cover Slider',      'Accessories',   12.99, 'completed', now()-interval '12 days'),
('Chloe Dupont',   'chloe.d@email.fr',      'Bluetooth Speaker Mini',   'Electronics',   79.99, 'completed', now()-interval '10 days'),
('Noah Williams',  'noah.w@email.com',      'Footrest Ergonomic',       'Furniture',     69.99, 'pending',   now()-interval  '9 days'),
('Fatima Al-Sayed','fatima.s@email.ae',     'Drawing Tablet Pro',       'Electronics',  379.99, 'completed', now()-interval  '8 days'),
('Marcus Johnson', 'marcus.j@email.com',   'Monitor Light Bar',        'Electronics',   89.99, 'completed', now()-interval  '7 days'),
('Samuel Adeyemi', 'sam.adeyemi@email.com', 'Desk Fan USB',             'Electronics',   39.99, 'pending',   now()-interval  '6 days'),
('Isabella Costa', 'isa.costa@email.br',    'Wireless Keyboard Slim',   'Electronics',   99.99, 'completed', now()-interval  '5 days'),
('Ravi Sharma',    'ravi.sharma@email.in',  'Phone Stand Adjustable',   'Accessories',   24.99, 'pending',   now()-interval  '4 days'),
('Aisha Patel',    'aisha.patel@email.com', 'ANC Headphones Over-Ear',  'Electronics',  299.99, 'completed', now()-interval  '3 days'),
('Diego Torres',   'diego.t@email.com',     'Laptop Cooler Pad',        'Accessories',   49.99, 'refunded',  now()-interval  '3 days'),
('Mei Lin',        'mei.lin@email.cn',      'Smart Bulb Kit 4-Pack',    'Electronics',   59.99, 'completed', now()-interval  '2 days'),
('Chloe Dupont',   'chloe.d@email.fr',      'Wrist Rest Memory Foam',   'Accessories',   29.99, 'completed', now()-interval  '2 days'),
('Ethan Park',     'ethan.park@email.kr',   'Dual USB-C Charger 100W',  'Electronics',   69.99, 'pending',   now()-interval  '1 day'),
('Priya Nair',     'priya.nair@email.in',   'Whiteboard Desktop',       'Accessories',   79.99, 'completed', now()-interval  '1 day'),
('Carlos Mendez',  'cmendez@correo.mx',     'Screen Cleaning Kit',      'Accessories',   19.99, 'completed', now()-interval '12 hours'),
('Sophie Müller',  'sophie.m@gmail.com',    'AI Writing Tool Sub',      'Software',     149.99, 'completed', now()-interval  '8 hours'),
('Fatima Al-Sayed','fatima.s@email.ae',     'Portable Projector Mini',  'Electronics',  449.99, 'pending',   now()-interval  '5 hours'),
('Noah Williams',  'noah.w@email.com',      'Desk Plant Succulent Kit', 'Accessories',   34.99, 'completed', now()-interval  '3 hours'),
('Emily Chen',     'emily.chen@email.com',  'Smart Notebook Elfinbook', 'Accessories',   44.99, 'completed', now()-interval  '1 hour'),
('Marcus Johnson', 'marcus.j@email.com',   'Acrylic Monitor Riser',    'Furniture',     59.99, 'cancelled', now()-interval '30 minutes');
