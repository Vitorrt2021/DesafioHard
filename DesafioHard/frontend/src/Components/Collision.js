const collision = {
    pointCircleCollisionDetection : (point,circle)=>{
        let distX = point.x - circle.x;
        let distY = point.y - circle.y;
        let distance = Math.sqrt( (distX*distX) + (distY*distY) );
        if (distance <= circle.radius) {
            return true;
        }
        return false;
    },
    pointRectCollisionDetection : (first, second)=>{
        if (    !(  first.x > second.x + second.width ||
                    first.x < second.x ||
                    first.y > second.y + second.height ||
                    first.y < second.y)
        ) {
            return true;
        };
    }
}

export default collision