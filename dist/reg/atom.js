"use strict";
/**
 * Register module
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.atom = void 0;
const uranio_trx_1 = __importDefault(require("uranio-trx"));
function atom(atom_definition, atom_name) {
    const final_atom_name = uranio_trx_1.default.register.atom(atom_definition, atom_name);
    return final_atom_name;
}
exports.atom = atom;
//# sourceMappingURL=atom.js.map