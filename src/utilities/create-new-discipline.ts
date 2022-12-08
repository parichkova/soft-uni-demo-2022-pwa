import { Discipline } from '../types/types';
import { mockarooBaseUrl } from '../constants';
import { getMockarooUrl } from './utilities';

const headers =  { 'Content-Type': 'application/json' };

export const createDiscipline = async (discipline: Discipline | null) => {
  try {
    try {
      const disciplinesAppCache = await caches.open('disciplinesApp');
      const cachedDisciplines = await disciplinesAppCache.match(
        `${mockarooBaseUrl}/discipline.json`,
        { ignoreVary: true, ignoreSearch: true }
      );

      if (cachedDisciplines) {
        const cachedProducts = await cachedDisciplines?.json() as Array<Discipline>;

        await disciplinesAppCache.put(new Request(
            cachedDisciplines.url,
            { method: "GET", headers }
          ),
          new Response(
            JSON.stringify([...cachedProducts, discipline]),
            { headers }
          ),
        );
      }
    } catch (e) {
      console.log("Issues retrieving requests from the cache");
    }

    const AddDisciplineQuery = await fetch(
      getMockarooUrl('/discipline'),
      { method: "POST", body: JSON.stringify(discipline) }
    );

    return (await AddDisciplineQuery.json()) as Discipline;
  } catch (error: any) {
    return {};
  }
}
