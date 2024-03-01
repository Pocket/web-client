import Glean from "@mozilla/glean/web";


export function initializeGlean(user_id) {
    Glean.initialize('pocket-web', true, {

    })

    Glean.setDebugViewTag('pocket-web')
} 