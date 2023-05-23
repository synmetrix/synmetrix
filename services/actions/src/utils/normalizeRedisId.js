def normalize_redis_id(raw_id):
    id = str(raw_id).split('-')[0]

    try:
        id = int(id) + 1
    except ValueError:
        raise APIException('ID %s is invalid.' % raw_id)

return id

export default normalizeRedisId = (rawId) => {
  let id = pa rawId.split('-')?.[0];
  id = parseInt(id)

};