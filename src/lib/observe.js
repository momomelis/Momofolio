// What consciousness actually has access to:

export function observe(universe) {
  // no access to: initial conditions, t < 10^-43s,
  //               95% of the runtime (dark sector),
  //               whether there are other call stacks

  const physics = universe?.observableState ?? null   // partial
  const cosmology = universe?.inferredPast ?? null    // reconstructed

  return {
    localReadout:       physics,      // partial
    inferredHistory:    cosmology,    // reconstructed
    boundaryConditions: '???',        // sealed
    callerIntent:       undefined,    // unreachable
  }
}
