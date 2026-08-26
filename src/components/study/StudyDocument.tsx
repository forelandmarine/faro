/**
 * Renders a StudyDoc: the long-form design and build briefing.
 *
 * The page chrome stays in Faro's own palette. Client colour appears only
 * inside bordered plates, so four documents in four identities still read as
 * one publication.
 */

import type { Block, StudyDoc } from "@/content/studies/types";
import {
  ClearSpaceDiagram,
  ConstructionSheet,
  GridDiagram,
  LockupAnatomy,
  MisusePanel,
  SizeLadder,
  SpacingScale,
} from "./Diagrams";
import {
  ColourTable,
  MotionTable,
  SpecGroups,
  SpecimenSheet,
  TypeFamilies,
  TypeScaleTable,
} from "./Tables";
import {
  ArchitectureDiagram,
  ImagePlate,
  MarkSheet,
  RejectedSheet,
  Timeline,
} from "./Plates";
import { StudyNav } from "./StudyNav";

export function StudyDocument({ doc }: { doc: StudyDoc }) {
  return (
    <>
      {doc.fontsHref && (
        <link rel="stylesheet" href={doc.fontsHref} precedence="default" />
      )}

      <StudyNav
        sections={doc.sections.map(({ id, number, title }) => ({
          id,
          number,
          title,
        }))}
      />

      <DocumentHeader doc={doc} />
      <Contents doc={doc} />

      {doc.sections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="mt-20 md:mt-28 scroll-mt-24"
        >
          <div className="flex items-baseline gap-4 border-t border-foreground/15 pt-6">
            <span className="font-mono text-sm text-accent shrink-0">
              {section.number}
            </span>
            <h2 className="type-display text-[clamp(1.5rem,3vw,2.25rem)] leading-tight">
              {section.title}
            </h2>
          </div>
          {section.blocks.map((block, i) => (
            <BlockView key={i} block={block} name={doc.client} />
          ))}
        </section>
      ))}
    </>
  );
}

/* ── Header and contents ────────────────────────────────────────────── */

function DocumentHeader({ doc }: { doc: StudyDoc }) {
  return (
    <header className="mb-14">
      <p className="type-eyebrow mb-6">Design and build notes</p>
      <h1 className="type-display text-[clamp(2.2rem,5.5vw,4.25rem)] leading-[0.98] mb-6">
        {doc.title}
      </h1>
      <p className="text-lg md:text-2xl text-foreground/80 leading-relaxed max-w-2xl">
        {doc.subtitle}
      </p>

      <dl className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-6 border-t border-foreground/15 pt-8">
        <Field label="Client" value={doc.client} />
        <Field label="Sector" value={doc.sector} />
        <Field label="Year" value={doc.year} />
        <div>
          <dt className="text-[10px] tracking-[0.14em] uppercase text-foreground/50">
            Live
          </dt>
          <dd className="text-sm mt-1.5">
            <a
              href={doc.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent-light break-all"
            >
              {doc.liveUrl.replace(/^https?:\/\//, "")}
              <span className="inline-block ml-1">&#8599;</span>
            </a>
          </dd>
        </div>
        <div className="col-span-2 md:col-span-4">
          <dt className="text-[10px] tracking-[0.14em] uppercase text-foreground/50">
            Scope
          </dt>
          <dd className="text-sm mt-1.5 text-foreground/80">
            {doc.scope.join(", ")}
          </dd>
        </div>
      </dl>
    </header>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[10px] tracking-[0.14em] uppercase text-foreground/50">
        {label}
      </dt>
      <dd className="text-sm mt-1.5 text-foreground/85">{value}</dd>
    </div>
  );
}

function Contents({ doc }: { doc: StudyDoc }) {
  return (
    <nav aria-label="Contents" className="border-t border-foreground/15 pt-8">
      <p className="type-eyebrow mb-5">Contents</p>
      <ol className="grid grid-cols-1 sm:grid-cols-2 gap-x-10">
        {doc.sections.map((s) => (
          <li key={s.id} className="border-b border-foreground/10">
            <a
              href={`#${s.id}`}
              className="flex items-baseline gap-4 py-3 group hover:text-accent transition-colors"
            >
              <span className="font-mono text-xs text-foreground/45 group-hover:text-accent">
                {s.number}
              </span>
              <span className="text-sm">{s.title}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/* ── Blocks ─────────────────────────────────────────────────────────── */

function BlockView({ block, name }: { block: Block; name: string }) {
  switch (block.kind) {
    case "prose":
      return (
        <div className="mt-7 max-w-2xl space-y-4 text-foreground/85 text-base md:text-lg leading-relaxed">
          {block.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      );

    case "bullets":
      return (
        <ul className="mt-7 max-w-2xl space-y-3">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-4">
              <span className="text-accent shrink-0">&bull;</span>
              <span className="text-base text-foreground/85 leading-relaxed">
                {item}
              </span>
            </li>
          ))}
        </ul>
      );

    case "list":
      return (
        <div className="mt-8 max-w-2xl">
          {block.heading && <p className="type-eyebrow mb-4">{block.heading}</p>}
          <ul className="divide-y divide-foreground/10">
            {block.items.map((item) => (
              <li key={item.label} className="py-3">
                <span className="text-base font-medium">{item.label}</span>
                {item.note && (
                  <span className="block text-sm text-foreground/60 mt-0.5 leading-snug">
                    {item.note}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      );

    case "marks":
      return <MarkSheet tiles={block.tiles} name={name} />;

    case "construction":
      return (
        <ConstructionSheet
          geometry={block.geometry}
          module={block.module}
          caption={block.caption}
          notes={block.notes}
        />
      );

    case "clearspace":
      return (
        <ClearSpaceDiagram
          geometry={block.geometry}
          unitValue={block.unitValue}
          unitLabel={block.unitLabel}
          multiplier={block.multiplier}
          caption={block.caption}
        />
      );

    case "sizes":
      return (
        <SizeLadder
          src={block.src}
          widths={block.widths}
          minPx={block.minPx}
          minMm={block.minMm}
          bg={block.bg}
          caption={block.caption}
        />
      );

    case "anatomy":
      return (
        <LockupAnatomy
          geometry={block.geometry}
          parts={block.parts}
          caption={block.caption}
        />
      );

    case "misuse":
      return (
        <MisusePanel
          src={block.src}
          bg={block.bg}
          ink={block.ink}
          items={block.items}
        />
      );

    case "timeline":
      return (
        <Timeline
          entries={block.entries}
          summary={block.summary}
          source={block.source}
        />
      );

    case "rejected":
      return (
        <RejectedSheet
          plates={block.plates}
          bg={block.bg}
          columns={block.columns}
        />
      );

    case "colour":
      return <ColourTable swatches={block.swatches} contrast={block.contrast} />;

    case "type":
      return <TypeFamilies families={block.families} />;

    case "typescale":
      return <TypeScaleTable rows={block.rows} />;

    case "specimen":
      return (
        <SpecimenSheet
          css={block.css}
          weight={block.weight}
          label={block.label}
          sample={block.sample}
        />
      );

    case "grid":
      return (
        <GridDiagram breakpoints={block.breakpoints} measures={block.measures} />
      );

    case "spacing":
      return <SpacingScale steps={block.steps} base={block.base} />;

    case "motion":
      return <MotionTable rows={block.rows} note={block.note} />;

    case "spec":
      return <SpecGroups groups={block.groups} />;

    case "architecture":
      return (
        <ArchitectureDiagram layers={block.layers} caption={block.caption} />
      );

    case "image":
      return (
        <ImagePlate
          src={block.src}
          alt={block.alt}
          caption={block.caption}
          width={block.width}
          height={block.height}
          frame={block.frame}
        />
      );

    case "note":
      return (
        <p className="mt-7 max-w-2xl text-sm text-foreground/60 leading-relaxed border-l-2 border-accent/40 pl-4">
          {block.text}
        </p>
      );
  }
}
