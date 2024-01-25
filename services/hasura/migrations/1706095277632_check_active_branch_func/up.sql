DROP FUNCTION IF EXISTS prevent_duplicate_active_branch() CASCADE;
CREATE OR REPLACE FUNCTION prevent_duplicate_active_branch()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'active' THEN
    IF EXISTS (
      SELECT 1
      FROM branches b
      WHERE b.datasource_id = NEW.datasource_id
        AND b.status = 'active'
    ) THEN
      RAISE EXCEPTION 'Cannot insert active branch when active branch already exists for the datasource';
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS prevent_duplicate_active_branch_trigger ON branches;
CREATE TRIGGER prevent_duplicate_active_branch_trigger
BEFORE INSERT ON branches
FOR EACH ROW EXECUTE FUNCTION prevent_duplicate_active_branch();