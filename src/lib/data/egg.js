export function getNewEgg(eggId, provenance) {
    return {
        eggId: eggId,
        dadId: provenance.dadId,
        generation: provenance.generation,
        mumId: provenance.mumId,
        species: provenance.species
    };		
}
