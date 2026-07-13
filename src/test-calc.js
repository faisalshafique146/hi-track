const satellite = require('satellite.js');

const tleLine1 = '1 25544U 98067A   26193.79871965  .00004831  00000+0  95802-4 0  9996';
const tleLine2 = '2 25544  51.6429 270.2188 0005235 244.6063 219.0664 15.49506649576435';

function getISSPosition() {
    const satRec = satellite.twoline2satrec(tleLine1, tleLine2);
    const now = new Date();
    const positionAndVelocity = satellite.propagate(satRec, now);
    const gmst = satellite.gstime(now);

    const positionEci = positionAndVelocity.position;
    const velocityEci = positionAndVelocity.velocity;

    if (!positionEci || !velocityEci) {
        throw new Error("Could not propagate satellite position");
    }

    const positionGd = satellite.eciToGeodetic(positionEci, gmst);
    const latitude = satellite.radiansToDegrees(positionGd.latitude);
    // satellite.js longitude is returned in radians [-pi, pi]
    const longitude = satellite.radiansToDegrees(positionGd.longitude);
    const altitude = positionGd.height; // in km

    // Calculate velocity in km/h (velocity components are in km/s)
    const vx = velocityEci.x;
    const vy = velocityEci.y;
    const vz = velocityEci.z;
    const velocityKmS = Math.sqrt(vx*vx + vy*vy + vz*vz);
    const velocity = velocityKmS * 3600; // km/h

    return {
        latitude,
        longitude,
        altitude,
        velocity,
        timestamp: Math.floor(now.getTime() / 1000)
    };
}

try {
    const pos = getISSPosition();
    console.log("Calculated ISS Position:", pos);
} catch (e) {
    console.error(e);
}
