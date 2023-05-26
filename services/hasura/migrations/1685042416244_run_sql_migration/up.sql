CREATE FUNCTION duration(request_logs_row request_logs)
RETURNS double precision AS $$
  SELECT ROUND(EXTRACT(EPOCH FROM request_logs_row.start_time - request_logs_row.end_time))
$$ LANGUAGE sql STABLE;
