function tsp_ls(distanceMatrix) {
    const n = distanceMatrix.length;
    if (n <= 1) return 0;
  
    function calculateRouteDistance(route) {
      let distance = 0;
      for (let i = 0; i < route.length - 1; i++) {
        distance += distanceMatrix[route[i]][route[i + 1]];
      }
      return distance;
    }
  
    function twoOptSwap(route, i, k) {
      return [
        ...route.slice(0, i),
        ...route.slice(i, k + 1).reverse(),
        ...route.slice(k + 1)
      ];
    }

    let currentRoute = Array.from({ length: n }, (_, i) => i);
    for (let i = currentRoute.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [currentRoute[i], currentRoute[j]] = [currentRoute[j], currentRoute[i]];
    }
    let currentDistance = calculateRouteDistance(currentRoute);
    let improvement = true;
    let maxIterationsWithoutImprovement = 100;
    let iterationsWithoutImprovement = 0;
    while (improvement && iterationsWithoutImprovement < maxIterationsWithoutImprovement) {
        improvement = false;
        const i = Math.floor(Math.random() * (n - 1));
        const k = Math.floor(Math.random() * (n - i - 1)) + i + 1;
        const newRoute = twoOptSwap(currentRoute, i, k);
        const newDistance = calculateRouteDistance(newRoute);
        if (newDistance < currentDistance) {
          currentRoute = newRoute;
          currentDistance = newDistance;
          improvement = true;
          iterationsWithoutImprovement = 0;
        } else {
          iterationsWithoutImprovement++;
        }
      }
      return currentDistance;
    }
    
    // Explanation of design choices:
// 1. Stopping criterion: The algorithm stops after 100 iterations without any improvement.
//    This prevents the algorithm from running indefinitely and balances exploration with computation time.
// 2. Choosing i and k: The indices i and k are chosen randomly in each iteration, ensuring that i < k.
//    This randomness avoids repeatedly undoing prior changes and explores a variety of route adjustments.

