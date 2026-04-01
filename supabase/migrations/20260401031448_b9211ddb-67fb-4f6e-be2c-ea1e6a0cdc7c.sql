
-- Create seed providers (equipment owners and skilled farmers)
-- Using fixed UUIDs so we can reference them

INSERT INTO providers (id, user_id, full_name, phone_number, email, provider_type, approval_status, district, state, address, pincode, approved_at)
VALUES
  -- Equipment Owners
  ('a1000001-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'Ravi Kumar', '9876543210', 'ravi@example.com', 'equipment_owner', 'approved', 'Hazaribagh', 'Jharkhand', 'Bagodar, Hazaribagh', '825301', now()),
  ('a1000001-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000002', 'Sunil Sharma', '9876543211', 'sunil@example.com', 'equipment_owner', 'approved', 'Jamshedpur', 'Jharkhand', 'Jamshedpur', '831001', now()),
  ('a1000001-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000003', 'Suresh Singh', '9876543212', 'suresh@example.com', 'equipment_owner', 'approved', 'Bokaro', 'Jharkhand', 'Bokaro Steel City', '827001', now()),
  ('a1000001-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000004', 'Manoj Yadav', '9876543213', 'manoj@example.com', 'equipment_owner', 'approved', 'Ranchi', 'Jharkhand', 'Ranchi', '834001', now()),
  ('a1000001-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000005', 'Dinesh Mahto', '9876543214', 'dinesh@example.com', 'equipment_owner', 'approved', 'Dhanbad', 'Jharkhand', 'Dhanbad', '826001', now()),
  ('a1000001-0000-0000-0000-000000000006', '00000000-0000-0000-0000-000000000006', 'Prakash Oraon', '9876543215', 'prakash@example.com', 'equipment_owner', 'approved', 'Deoghar', 'Jharkhand', 'Deoghar', '814112', now()),
  -- Skilled Farmers
  ('a2000001-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000011', 'Ramesh Kumar', '9988776601', 'ramesh@example.com', 'skilled_farmer', 'approved', 'Ranchi', 'Jharkhand', 'Ranchi', '834001', now()),
  ('a2000001-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000012', 'Sunil Singh', '9988776602', 'sunils@example.com', 'skilled_farmer', 'approved', 'Jamshedpur', 'Jharkhand', 'Jamshedpur', '831001', now()),
  ('a2000001-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000013', 'Vikash Yadav', '9988776603', 'vikash@example.com', 'skilled_farmer', 'approved', 'Dhanbad', 'Jharkhand', 'Dhanbad', '826001', now()),
  ('a2000001-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000014', 'Ajay Munda', '9988776604', 'ajay@example.com', 'skilled_farmer', 'approved', 'Hazaribagh', 'Jharkhand', 'Hazaribagh', '825301', now()),
  ('a2000001-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000015', 'Deepak Tirkey', '9988776605', 'deepak@example.com', 'skilled_farmer', 'approved', 'Bokaro', 'Jharkhand', 'Bokaro', '827001', now()),
  ('a2000001-0000-0000-0000-000000000006', '00000000-0000-0000-0000-000000000016', 'Santosh Sahu', '9988776606', 'santosh@example.com', 'skilled_farmer', 'approved', 'Deoghar', 'Jharkhand', 'Deoghar', '814112', now()),
  ('a2000001-0000-0000-0000-000000000007', '00000000-0000-0000-0000-000000000017', 'Raj Kumar Hansda', '9988776607', 'raj@example.com', 'skilled_farmer', 'approved', 'Dumka', 'Jharkhand', 'Dumka', '814101', now()),
  ('a2000001-0000-0000-0000-000000000008', '00000000-0000-0000-0000-000000000018', 'Birsa Oraon', '9988776608', 'birsa@example.com', 'skilled_farmer', 'approved', 'Lohardaga', 'Jharkhand', 'Lohardaga', '835302', now()),
  ('a2000001-0000-0000-0000-000000000009', '00000000-0000-0000-0000-000000000019', 'Mukesh Mahli', '9988776609', 'mukesh@example.com', 'skilled_farmer', 'approved', 'Giridih', 'Jharkhand', 'Giridih', '815301', now())
ON CONFLICT (id) DO NOTHING;

-- Seed Equipment Listings (12 items)
INSERT INTO equipment_listings (id, provider_id, equipment_name, equipment_type, power_capacity, hourly_rate, daily_rate, location, district, state, features, brand, model, availability_status, is_active)
VALUES
  (gen_random_uuid(), 'a1000001-0000-0000-0000-000000000001', 'John Deere 5039D Power Pro', 'Tractor', '41 HP', 900, 6000, 'Bagodar, Hazaribagh, Jharkhand', 'Hazaribagh', 'Jharkhand', ARRAY['GPS Tracking', 'Fuel Efficient', 'Well Maintained'], 'John Deere', '5039D', 'available', true),
  (gen_random_uuid(), 'a1000001-0000-0000-0000-000000000002', 'Swaraj 855 FE Tractor', 'Tractor', '50 HP', 850, 6500, 'Jamshedpur, Jharkhand', 'Jamshedpur', 'Jharkhand', ARRAY['Power Steering', 'High Lift Capacity', '4WD Available'], 'Swaraj', '855 FE', 'available', true),
  (gen_random_uuid(), 'a1000001-0000-0000-0000-000000000003', 'John Deere W70 Combine Harvester', 'Harvester', '130 HP', 2500, 18000, 'Bokaro, Jharkhand', 'Bokaro', 'Jharkhand', ARRAY['Advanced Cutting', 'Large Capacity', 'Operator Included'], 'John Deere', 'W70', 'available', true),
  (gen_random_uuid(), 'a1000001-0000-0000-0000-000000000004', 'Mahindra 275 DI TU XP Plus', 'Tractor', '39 HP', 750, 5500, 'Ranchi, Jharkhand', 'Ranchi', 'Jharkhand', ARRAY['Fuel Efficient', 'Easy Maintenance', 'Heavy Duty'], 'Mahindra', '275 DI', 'available', true),
  (gen_random_uuid(), 'a1000001-0000-0000-0000-000000000005', 'Massey Ferguson 1035 DI', 'Tractor', '36 HP', 700, 5000, 'Dhanbad, Jharkhand', 'Dhanbad', 'Jharkhand', ARRAY['Compact Design', 'Multi-Purpose', 'Low Maintenance'], 'Massey Ferguson', '1035 DI', 'available', true),
  (gen_random_uuid(), 'a1000001-0000-0000-0000-000000000006', 'Kubota DC-68G Harvester', 'Harvester', '68 HP', 2000, 15000, 'Deoghar, Jharkhand', 'Deoghar', 'Jharkhand', ARRAY['Auto Threshing', 'High Efficiency', 'GPS Enabled'], 'Kubota', 'DC-68G', 'available', true),
  (gen_random_uuid(), 'a1000001-0000-0000-0000-000000000001', 'Sonalika Tiger DI 75', 'Tractor', '75 HP', 1200, 8000, 'Bagodar, Hazaribagh, Jharkhand', 'Hazaribagh', 'Jharkhand', ARRAY['Heavy Duty', 'AC Cabin', 'Power Steering'], 'Sonalika', 'Tiger DI 75', 'available', true),
  (gen_random_uuid(), 'a1000001-0000-0000-0000-000000000002', 'KR Rotavator 6ft', 'Tiller', '45 HP Compatible', 500, 3500, 'Jamshedpur, Jharkhand', 'Jamshedpur', 'Jharkhand', ARRAY['Deep Tilling', 'Adjustable Depth', 'Heavy Blades'], 'KR Agriculture', 'RT-6', 'available', true),
  (gen_random_uuid(), 'a1000001-0000-0000-0000-000000000003', 'Aspee HTP Power Sprayer', 'Sprayer', '16L Tank', 300, 2000, 'Bokaro, Jharkhand', 'Bokaro', 'Jharkhand', ARRAY['High Pressure', 'Adjustable Nozzle', 'Battery Operated'], 'Aspee', 'HTP-768', 'available', true),
  (gen_random_uuid(), 'a1000001-0000-0000-0000-000000000004', 'Fieldking Reversible Plough', 'Plough', '3 Bottom', 400, 2800, 'Ranchi, Jharkhand', 'Ranchi', 'Jharkhand', ARRAY['Hydraulic Reversible', 'Deep Ploughing', 'Durable Build'], 'Fieldking', 'RMP-3', 'available', true),
  (gen_random_uuid(), 'a1000001-0000-0000-0000-000000000005', 'Shaktiman Multi Crop Thresher', 'Harvester', '10 HP Motor', 600, 4000, 'Dhanbad, Jharkhand', 'Dhanbad', 'Jharkhand', ARRAY['Multi Crop', 'High Output', 'Low Grain Loss'], 'Shaktiman', 'MCT-100', 'available', true),
  (gen_random_uuid(), 'a1000001-0000-0000-0000-000000000006', 'Lemken Cultivator 9/300', 'Cultivator', '50 HP Compatible', 550, 3800, 'Deoghar, Jharkhand', 'Deoghar', 'Jharkhand', ARRAY['Spring Loaded', 'Weed Control', 'Soil Mixing'], 'Lemken', 'Thorit 9/300', 'available', true)
ON CONFLICT (id) DO NOTHING;

-- Seed Skilled Farmer Profiles (9 farmers)
INSERT INTO skilled_farmer_profiles (id, provider_id, skills, experience_years, hourly_rate, daily_rate, availability_status, languages, specialties, bio, is_active)
VALUES
  (gen_random_uuid(), 'a2000001-0000-0000-0000-000000000001', ARRAY['Tractor Operator', 'Planting & Sowing'], 10, 800, 6000, 'available', ARRAY['Hindi', 'Bengali'], ARRAY['Tractors', 'Rotavators', 'Plowing'], 'Experienced tractor operator with 10 years of farming experience.', true),
  (gen_random_uuid(), 'a2000001-0000-0000-0000-000000000002', ARRAY['Harvesting', 'Tractor Operator'], 12, 850, 6500, 'available', ARRAY['Hindi', 'Bengali'], ARRAY['Combine Operation', 'Crop Management'], 'Skilled harvester operator specializing in paddy and wheat.', true),
  (gen_random_uuid(), 'a2000001-0000-0000-0000-000000000003', ARRAY['Irrigation', 'Pesticide Application'], 8, 700, 5000, 'available', ARRAY['Hindi'], ARRAY['Drip Irrigation', 'Pest Control'], 'Irrigation specialist with modern farming techniques knowledge.', true),
  (gen_random_uuid(), 'a2000001-0000-0000-0000-000000000004', ARRAY['Planting & Sowing', 'Harvesting'], 15, 900, 7000, 'available', ARRAY['Hindi', 'Nagpuri'], ARRAY['Paddy Cultivation', 'Vegetable Farming'], 'Senior farmer with expertise in paddy and vegetable cultivation.', true),
  (gen_random_uuid(), 'a2000001-0000-0000-0000-000000000005', ARRAY['Tractor Operator', 'Pesticide Application'], 6, 650, 4500, 'available', ARRAY['Hindi'], ARRAY['Land Leveling', 'Spraying'], 'Young energetic farmer skilled in modern equipment operation.', true),
  (gen_random_uuid(), 'a2000001-0000-0000-0000-000000000006', ARRAY['Harvesting', 'Planting & Sowing'], 20, 1000, 7500, 'available', ARRAY['Hindi', 'Santhali'], ARRAY['Organic Farming', 'Seed Treatment'], 'Veteran farmer with two decades of organic farming experience.', true),
  (gen_random_uuid(), 'a2000001-0000-0000-0000-000000000007', ARRAY['Irrigation', 'Tractor Operator'], 7, 750, 5500, 'available', ARRAY['Hindi', 'Santhali'], ARRAY['Bore Well Management', 'Canal Irrigation'], 'Expert in irrigation systems and water management.', true),
  (gen_random_uuid(), 'a2000001-0000-0000-0000-000000000008', ARRAY['Pesticide Application', 'Harvesting'], 9, 800, 6000, 'available', ARRAY['Hindi', 'Mundari'], ARRAY['Crop Protection', 'Grain Storage'], 'Specialist in crop protection and post-harvest management.', true),
  (gen_random_uuid(), 'a2000001-0000-0000-0000-000000000009', ARRAY['Planting & Sowing', 'Irrigation'], 11, 850, 6200, 'available', ARRAY['Hindi'], ARRAY['Horticulture', 'Nursery Management'], 'Horticulture expert with nursery management skills.', true)
ON CONFLICT (id) DO NOTHING;
