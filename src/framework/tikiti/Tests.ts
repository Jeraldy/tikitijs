export function domTreeUpdatedTEST(domTree: {}[], domTreeUpdate: {}[]) {
    console.assert(domTree.length === domTreeUpdate.length,
        `domTree: ${domTree.length} != domTreeUpdate: ${domTreeUpdate.length}`
    )
}