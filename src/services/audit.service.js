const db = require("../config/db");

exports.log = async payload => {
  await db.execute(
    `
      INSERT INTO audit_logs (
        institution_id,
        actor_id,
        action,
        entity,
        entity_id,
        metadata
      )
      VALUES (?, ?, ?, ?, ?, ?)
    `,
    [
      payload.institutionId,
      payload.actorId,
      payload.action,
      payload.entity,
      payload.entityId,
      JSON.stringify(payload.metadata || {})
    ]
  );
};