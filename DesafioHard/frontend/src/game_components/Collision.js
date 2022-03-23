const collision = {
	// pointCircleCollisionDetection: (point, circle) => {
	// 	let distX = point.x - circle.x;
	// 	let distY = point.y - circle.y;
	// 	let distance = Math.sqrt(distX * distX + distY * distY);
	// 	if (distance <= circle.radius) {
	// 		return true;
	// 	}
	// 	return false;
	// },
	// pointRectCollisionDetection: (first, second) => {
	// 	if (
	// 		!(
	// 			first.x > second.x + second.width ||
	// 			first.x < second.x ||
	// 			first.y > second.y + second.height ||
	// 			first.y < second.y
	// 		)
	// 	) {
	// 		return true;
	// 	}
	// },
	rectRectCollisionDetection: (rect1, rect2) => {
		if (
			rect1.collisionX < rect2.collisionX + rect2.collisionWidth &&
			rect1.collisionX + rect1.collisionWidth > rect2.collisionX &&
			rect1.collisionY < rect2.collisionY + rect2.collisionHeight &&
			rect1.collisionY + rect1.collisionHeight > rect2.collisionY
		) {
			return true;
		} else {
			return false;
		}
	},
};

// this.collisionX = x;
// this.collisionY = y;
// this.collisionWidth = this.width;
// this.collisionHeight = this.height;

export default collision;
