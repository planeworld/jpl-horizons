

module.exports.object2lua = function(object) {
    var lua = 'local M={}\n';
    lua += 'local idObj = pw.system.create_obj()\n';
    lua += 'pw.physics.obj_set_name(idObj, "'+ object.name +'")\n';
    lua += 'local idShp = pw.system.create_shp("shp_circle")\n';
    lua += 'pw.physics.shp_set_radius(idShp, '+ object.radius +')\n';
    lua += 'pw.physics.shp_set_mass(idShp, '+ object.mass +')\n';
    lua += 'pw.system.obj_add_shp(idObj, idShp)\n';
    if (object.position) {
      lua += 'pw.physics.obj_set_position(idObj, '+ object.position[0] +', '+ object.position[1] +')\n';
    }
    if (object.velocity) {
      lua += 'pw.physics.obj_set_velocity(idObj, '+ object.velocity[0] +', '+ object.velocity[1] +')\n';
    }
    if (object.rotation) {
      lua += 'pw.physics.obj_set_angle_vel(idObj, '+ object.rotation +')\n';
    }
    lua += 'return M\n';
    return lua;
};


