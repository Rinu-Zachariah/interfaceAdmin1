'use strict';
import init from '../tools/init';

module.exports.development = {
      history: "http://dev-sandbox-lx61.amdc.mckinsey.com:4000/odchistory",
      polls: "http://dev-sandbox-lx61.amdc.mckinsey.com:4000/poll",
      allevents: "http://dev-sandbox-lx61.amdc.mckinsey.com:4000/allevents",
      events: "http://dev-sandbox-lx61.amdc.mckinsey.com:4000/events",
      quicklinks: "http://dev-sandbox-lx61.amdc.mckinsey.com:4000/quicklinks",
      mandatorytrainings: "http://dev-sandbox-lx61.amdc.mckinsey.com:4000/mandatorytrainings",
      gallery: "http://dev-sandbox-lx61.amdc.mckinsey.com:4000/gallery",
      upload:"http://dev-sandbox-lx61.amdc.mckinsey.com:4000/upload",
      logs:"http://dev-sandbox-lx61.amdc.mckinsey.com:4000/logs"
}

module.exports.production = {
      history: "http://dev-sandbox-lx61.amdc.mckinsey.com:3000/odchistory",
      polls: "http://dev-sandbox-lx61.amdc.mckinsey.com:3000/poll",
      allevents: "http://dev-sandbox-lx61.amdc.mckinsey.com:3000/allevents",
      events: "http://dev-sandbox-lx61.amdc.mckinsey.com:3000/events",
      quicklinks: "http://dev-sandbox-lx61.amdc.mckinsey.com:3000/quicklinks",
      mandatorytrainings: "http://dev-sandbox-lx61.amdc.mckinsey.com:3000/mandatorytrainings",
      gallery: "http://dev-sandbox-lx61.amdc.mckinsey.com:3000/gallery",
      upload:"http://dev-sandbox-lx61.amdc.mckinsey.com:3000/upload",
      logs:"http://dev-sandbox-lx61.amdc.mckinsey.com:3000/logs"
}

  module.exports.localhost = {
        history: "http://localhost:4000/odchistory",
        polls: "http://localhost:4000/poll",
        allevents: "http://localhost:4000/allevents",
        events: "http://localhost:4000/events",
        quicklinks: "http://localhost:4000/quicklinks",
        mandatorytrainings: "http://localhost:4000/mandatorytrainings",
        gallery: "http://localhost:4000/gallery",
        upload:"http://localhost:4000/upload",
        logs:"http://localhost:4000/logs"
  }
