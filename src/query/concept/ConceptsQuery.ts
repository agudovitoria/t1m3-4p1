import Concept from '../../domain/Concept';
import ConceptSearchCriteria from '../../domain/request/ConceptSearchCriteria';

export default interface ConceptsQuery {
  execute(conceptSearchCriteria: ConceptSearchCriteria): Promise<Concept[]>;
}
