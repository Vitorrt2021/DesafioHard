const collision = {
  pointCircleCollisionDetection: (point, circle) => {
    let distX = point.x - circle.x;
    let distY = point.y - circle.y;
    let distance = Math.sqrt(distX * distX + distY * distY);
    if (distance <= circle.radius) {
      return true;
    }
    return false;
  },
  pointRectCollisionDetection: (first, second) => {
    if (
      !(
        first.x > second.x + second.width ||
        first.x < second.x ||
        first.y > second.y + second.height ||
        first.y < second.y
      )
    ) {
      return true;
    }
  },
  rectRectCollisionDetection: (rect1, rect2) => {
    if (
      rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y
    ) {
      return true;
    } else {
      return false;
    }
  },
};

export default collision;
