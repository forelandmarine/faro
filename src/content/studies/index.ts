import type { StudyDoc } from "./types";
import { forelandMarineStudy } from "./foreland-marine";
import { nimaraPilatesStudy } from "./nimara-pilates";
import { firstOwnersReferenceStudy } from "./first-owners-reference";
import { birdhamCarpentryStudy } from "./birdham-carpentry";
import { watermansStudy } from "./watermans";

export const STUDIES: StudyDoc[] = [
  forelandMarineStudy,
  nimaraPilatesStudy,
  firstOwnersReferenceStudy,
  birdhamCarpentryStudy,
  watermansStudy,
];

export function getStudy(slug: string): StudyDoc | undefined {
  return STUDIES.find((s) => s.slug === slug);
}

export * from "./types";
