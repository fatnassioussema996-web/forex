// lib/pdf/schema.ts - JSON Schema for course generation validation

/**
 * JSON Schema for OpenAI structured output
 * Based on avenqor-request-ready-course-trading-foundations.json
 * Original schema for regular course generation (8-10 modules)
 * Note: version field removed as per user requirements
 */
export const COURSE_JSON_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: [
    'meta',
    'cover',
    'legal_notice',
    'how_to_use',
    'toc',
    'preface',
    'modules',
    'diagrams',
    'one_page_summary',
    'glossary',
    'quiz',
    'footer_and_versioning',
  ],
  properties: {
    meta: {
      type: 'object',
      additionalProperties: false,
      required: ['course_id', 'brand', 'domain', 'language', 'created_at_iso', 'content_scope', 'education_only_notice'],
      properties: {
        course_id: { type: 'string' },
        brand: { type: 'string', enum: ['Avenqor'] },
        domain: { type: 'string', enum: ['avenqor.net'] },
        language: { type: 'string', enum: ['EN'] },
        created_at_iso: { type: 'string' },
        content_scope: {
          type: 'object',
          additionalProperties: false,
          required: ['level', 'market_scope', 'intended_pages_range'],
          properties: {
            level: { type: 'string' },
            market_scope: {
              type: 'array',
              minItems: 2,
              items: { type: 'string', enum: ['Forex', 'Crypto', 'Binary'] },
            },
            intended_pages_range: { type: 'string' },
          },
        },
        education_only_notice: {
          type: 'object',
          additionalProperties: false,
          required: ['title', 'bullets'],
          properties: {
            title: { type: 'string' },
            bullets: {
              type: 'array',
              minItems: 4,
              items: { type: 'string' },
            },
          },
        },
      },
    },
    cover: {
      type: 'object',
      additionalProperties: false,
      required: ['title', 'subtitle', 'tagline', 'chips', 'image_generation', 'layout_notes'],
      properties: {
        title: { type: 'string' },
        subtitle: { type: 'string' },
        tagline: { type: 'string' },
        chips: {
          type: 'array',
          minItems: 2,
          maxItems: 6,
          items: { type: 'string' },
        },
        image_generation: {
          type: 'object',
          additionalProperties: false,
          required: ['image_prompt', 'negative_prompt', 'alt_text', 'style_notes', 'suggested_format'],
          properties: {
            image_prompt: { type: 'string' },
            negative_prompt: { type: 'string' },
            alt_text: { type: 'string' },
            style_notes: { type: 'string' },
            suggested_format: {
              type: 'object',
              additionalProperties: false,
              required: ['aspect_ratio', 'suggested_size_px'],
                    properties: {
                      aspect_ratio: { type: 'string', enum: ['3:4', '4:5'] },
                      suggested_size_px: { type: 'string' },
                    },
            },
          },
        },
        layout_notes: { type: 'string' },
      },
    },
    legal_notice: {
      type: 'object',
      additionalProperties: false,
      required: ['title', 'bullets', 'who_this_is_not_for'],
      properties: {
        title: { type: 'string' },
        bullets: {
          type: 'array',
          minItems: 5,
          items: { type: 'string' },
        },
        who_this_is_not_for: {
          type: 'array',
          minItems: 3,
          items: { type: 'string' },
        },
      },
    },
    how_to_use: {
      type: 'object',
      additionalProperties: false,
      required: ['title', 'recommended_pace', 'instructions', 'study_tools'],
      properties: {
        title: { type: 'string' },
        recommended_pace: {
          type: 'array',
          minItems: 3,
          items: { type: 'string' },
        },
        instructions: {
          type: 'array',
          minItems: 6,
          items: { type: 'string' },
        },
        study_tools: {
          type: 'object',
          additionalProperties: false,
          required: ['print_friendly_note', 'journal_suggestion', 'review_schedule'],
          properties: {
            print_friendly_note: { type: 'string' },
            journal_suggestion: { type: 'string' },
            review_schedule: { type: 'string' },
          },
        },
      },
    },
    toc: {
      type: 'object',
      additionalProperties: false,
      required: ['title', 'entries_note', 'entries'],
      properties: {
        title: { type: 'string' },
        entries_note: { type: 'string' },
        entries: {
          type: 'array',
          minItems: 12,
          items: {
            type: 'object',
            additionalProperties: false,
            required: ['title', 'anchor_id', 'type'],
            properties: {
              title: { type: 'string' },
              anchor_id: { type: 'string' },
              type: { type: 'string', enum: ['section', 'module', 'lesson', 'appendix'] },
              children: {
                type: 'array',
                items: {
                  type: 'object',
                  additionalProperties: false,
                  required: ['title', 'anchor_id', 'type'],
                  properties: {
                    title: { type: 'string' },
                    anchor_id: { type: 'string' },
                    type: { type: 'string', enum: ['lesson', 'subsection'] },
                  },
                },
              },
            },
          },
        },
      },
    },
    preface: {
      type: 'object',
      additionalProperties: false,
      required: ['title', 'who_this_is_for', 'what_you_will_learn', 'what_this_course_will_not_do', 'prerequisites'],
      properties: {
        title: { type: 'string' },
        who_this_is_for: {
          type: 'array',
          minItems: 3,
          items: { type: 'string' },
        },
        what_you_will_learn: {
          type: 'array',
          minItems: 6,
          items: { type: 'string' },
        },
        what_this_course_will_not_do: {
          type: 'array',
          minItems: 4,
          items: { type: 'string' },
        },
        prerequisites: {
          type: 'array',
          minItems: 1,
          items: { type: 'string' },
        },
      },
    },
    modules: {
      type: 'array',
      minItems: 8,
      maxItems: 10,
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['module_id', 'anchor_id', 'title', 'goal', 'lessons', 'checklist', 'exercise', 'risk_box', 'module_summary'],
        properties: {
          module_id: { type: 'string' },
          anchor_id: { type: 'string' },
          title: { type: 'string' },
          goal: { type: 'string' },
          lessons: {
            type: 'array',
            minItems: 2,
            maxItems: 4,
            items: {
              type: 'object',
              additionalProperties: false,
              required: ['lesson_id', 'anchor_id', 'title', 'content_blocks'],
              properties: {
                lesson_id: { type: 'string' },
                anchor_id: { type: 'string' },
                title: { type: 'string' },
                content_blocks: {
                  type: 'array',
                  minItems: 6,
                  items: {
                    type: 'object',
                    additionalProperties: false,
                    required: ['type', 'text'],
                    properties: {
                      type: {
                        type: 'string',
                        enum: ['paragraph', 'bullets', 'example', 'myth_vs_reality', 'definition'],
                      },
                      text: { type: 'string' },
                    },
                  },
                },
              },
            },
          },
          checklist: {
            type: 'object',
            additionalProperties: false,
            required: ['title', 'items'],
            properties: {
              title: { type: 'string' },
              items: {
                type: 'array',
                minItems: 7,
                items: { type: 'string' },
              },
            },
          },
          exercise: {
            type: 'object',
            additionalProperties: false,
            required: ['title', 'purpose', 'steps', 'expected_output'],
            properties: {
              title: { type: 'string' },
              purpose: { type: 'string' },
              steps: {
                type: 'array',
                minItems: 5,
                items: { type: 'string' },
              },
              expected_output: { type: 'string' },
            },
          },
          risk_box: {
            type: 'object',
            additionalProperties: false,
            required: ['title', 'points'],
            properties: {
              title: { type: 'string' },
              points: {
                type: 'array',
                minItems: 4,
                items: { type: 'string' },
              },
            },
          },
          module_summary: {
            type: 'object',
            additionalProperties: false,
            required: ['key_takeaways'],
            properties: {
              key_takeaways: {
                type: 'array',
                minItems: 5,
                items: { type: 'string' },
              },
            },
          },
        },
      },
    },
    diagrams: {
      type: 'array',
      minItems: 2,
      maxItems: 4,
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['diagram_id', 'title', 'what_it_shows', 'layout_notes', 'image_prompt', 'insert_after_anchor_id'],
        properties: {
          diagram_id: { type: 'string' },
          title: { type: 'string' },
          what_it_shows: { type: 'string' },
          layout_notes: { type: 'string' },
          image_prompt: { type: 'string' },
          insert_after_anchor_id: { type: 'string' },
        },
      },
    },
    one_page_summary: {
      type: 'object',
      additionalProperties: false,
      required: ['title', 'sections', 'print_note'],
      properties: {
        title: { type: 'string' },
        print_note: { type: 'string' },
        sections: {
          type: 'array',
          minItems: 4,
          maxItems: 6,
          items: {
            type: 'object',
            additionalProperties: false,
            required: ['heading', 'bullets'],
            properties: {
              heading: { type: 'string' },
              bullets: {
                type: 'array',
                minItems: 4,
                maxItems: 7,
                items: { type: 'string' },
              },
            },
          },
        },
      },
    },
    glossary: {
      type: 'array',
      minItems: 16,
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['term', 'plain_definition', 'why_it_matters'],
        properties: {
          term: { type: 'string' },
          plain_definition: { type: 'string' },
          why_it_matters: { type: 'string' },
        },
      },
    },
    quiz: {
      type: 'object',
      additionalProperties: false,
      required: ['title', 'questions'],
      properties: {
        title: { type: 'string' },
        questions: {
          type: 'array',
          minItems: 15,
          maxItems: 15,
          items: {
            type: 'object',
            additionalProperties: false,
            required: ['q', 'choices', 'correct_choice_index', 'explanation'],
            properties: {
              q: { type: 'string' },
              choices: {
                type: 'array',
                minItems: 4,
                maxItems: 4,
                items: { type: 'string' },
              },
              correct_choice_index: {
                type: 'integer',
                minimum: 0,
                maximum: 3,
              },
              explanation: { type: 'string' },
            },
          },
        },
      },
    },
    footer_and_versioning: {
      type: 'object',
      additionalProperties: false,
      required: ['header_rules', 'footer_rules', 'page_numbering'],
      properties: {
        header_rules: {
          type: 'object',
          additionalProperties: false,
          required: ['apply_from_section_anchor', 'left', 'right'],
          properties: {
            apply_from_section_anchor: { type: 'string' },
            left: { type: 'string' },
            right: { type: 'string' },
          },
        },
        footer_rules: {
          type: 'object',
          additionalProperties: false,
          required: ['apply_from_section_anchor', 'left', 'center', 'right'],
          properties: {
            apply_from_section_anchor: { type: 'string' },
            left: { type: 'string' },
            center: { type: 'string' },
            right: { type: 'string' },
          },
        },
        page_numbering: {
          type: 'object',
          additionalProperties: false,
          required: ['start_after_section_anchor', 'format'],
          properties: {
            start_after_section_anchor: { type: 'string' },
            format: { type: 'string' },
          },
        },
      },
    },
  },
} as const

/**
 * Optimized JSON Schema for Custom Course generation
 * Reduced limits to fit within token constraints while maintaining quality
 * Used with GPT-4.1-mini (32K tokens) for Custom Course generation
 */
export const CUSTOM_COURSE_JSON_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: [
    'meta',
    'cover',
    'legal_notice',
    'how_to_use',
    'toc',
    'preface',
    'modules',
    'diagrams',
    'one_page_summary',
    'glossary',
    'quiz',
    'footer_and_versioning',
  ],
  properties: {
    meta: {
      type: 'object',
      additionalProperties: false,
      required: ['course_id', 'brand', 'domain', 'language', 'created_at_iso', 'content_scope', 'education_only_notice'],
      properties: {
        course_id: { type: 'string' },
        brand: { type: 'string', enum: ['Avenqor'] },
        domain: { type: 'string', enum: ['avenqor.net'] },
        language: { type: 'string', enum: ['EN'] },
        created_at_iso: { type: 'string' },
        content_scope: {
          type: 'object',
          additionalProperties: false,
          required: ['level', 'market_scope', 'intended_pages_range'],
          properties: {
            level: { type: 'string' },
            market_scope: {
              type: 'array',
              minItems: 1,
              items: { type: 'string', enum: ['Forex', 'Crypto', 'Binary'] },
            },
            intended_pages_range: { type: 'string' },
          },
        },
        education_only_notice: {
          type: 'object',
          additionalProperties: false,
          required: ['title', 'bullets'],
          properties: {
            title: { type: 'string' },
            bullets: {
              type: 'array',
              minItems: 4,
              items: { type: 'string' },
            },
          },
        },
      },
    },
    cover: {
      type: 'object',
      additionalProperties: false,
      required: ['title', 'subtitle', 'tagline', 'chips', 'image_generation', 'layout_notes'],
      properties: {
        title: { type: 'string' },
        subtitle: { type: 'string' },
        tagline: { type: 'string' },
        chips: {
          type: 'array',
          minItems: 2,
          maxItems: 6,
          items: { type: 'string' },
        },
        image_generation: {
          type: 'object',
          additionalProperties: false,
          required: ['image_prompt', 'negative_prompt', 'alt_text', 'style_notes', 'suggested_format'],
          properties: {
            image_prompt: { type: 'string' },
            negative_prompt: { type: 'string' },
            alt_text: { type: 'string' },
            style_notes: { type: 'string' },
            suggested_format: {
              type: 'object',
              additionalProperties: false,
              required: ['aspect_ratio', 'suggested_size_px'],
              properties: {
                aspect_ratio: { type: 'string', enum: ['3:4', '4:5', '16:9', '4:3'] },
                suggested_size_px: { type: 'string' },
              },
            },
          },
        },
        layout_notes: { type: 'string' },
      },
    },
    legal_notice: {
      type: 'object',
      additionalProperties: false,
      required: ['title', 'bullets', 'who_this_is_not_for'],
      properties: {
        title: { type: 'string' },
        bullets: {
          type: 'array',
          minItems: 5,
          items: { type: 'string' },
        },
        who_this_is_not_for: {
          type: 'array',
          minItems: 3,
          items: { type: 'string' },
        },
      },
    },
    how_to_use: {
      type: 'object',
      additionalProperties: false,
      required: ['title', 'recommended_pace', 'instructions', 'study_tools'],
      properties: {
        title: { type: 'string' },
        recommended_pace: {
          type: 'array',
          minItems: 3,
          items: { type: 'string' },
        },
        instructions: {
          type: 'array',
          minItems: 6,
          items: { type: 'string' },
        },
        study_tools: {
          type: 'object',
          additionalProperties: false,
          required: ['print_friendly_note', 'journal_suggestion', 'review_schedule'],
          properties: {
            print_friendly_note: { type: 'string' },
            journal_suggestion: { type: 'string' },
            review_schedule: { type: 'string' },
          },
        },
      },
    },
    toc: {
      type: 'object',
      additionalProperties: false,
      required: ['title', 'entries_note', 'entries'],
      properties: {
        title: { type: 'string' },
        entries_note: { type: 'string' },
        entries: {
          type: 'array',
          minItems: 1,
          items: {
            type: 'object',
            additionalProperties: false,
            required: ['title', 'anchor_id', 'type', 'children'],
            properties: {
              title: { type: 'string' },
              anchor_id: { type: 'string' },
              type: { type: 'string', enum: ['section', 'module', 'lesson', 'appendix'] },
              children: {
                type: 'array',
                items: {
                  type: 'object',
                  additionalProperties: false,
                  required: ['title', 'anchor_id', 'type'],
                  properties: {
                    title: { type: 'string' },
                    anchor_id: { type: 'string' },
                    type: { type: 'string', enum: ['lesson', 'subsection'] },
                  },
                },
              },
            },
          },
        },
      },
    },
    preface: {
      type: 'object',
      additionalProperties: false,
      required: ['title', 'who_this_is_for', 'what_you_will_learn', 'what_this_course_will_not_do', 'prerequisites'],
      properties: {
        title: { type: 'string' },
        who_this_is_for: {
          type: 'array',
          minItems: 3,
          items: { type: 'string' },
        },
        what_you_will_learn: {
          type: 'array',
          minItems: 6,
          items: { type: 'string' },
        },
        what_this_course_will_not_do: {
          type: 'array',
          minItems: 4,
          items: { type: 'string' },
        },
        prerequisites: {
          type: 'array',
          minItems: 1,
          items: { type: 'string' },
        },
      },
    },
    modules: {
      type: 'array',
      minItems: 3,
      maxItems: 4,
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['module_id', 'anchor_id', 'title', 'goal', 'lessons', 'checklist', 'exercise', 'risk_box', 'module_summary'],
        properties: {
          module_id: { type: 'string' },
          anchor_id: { type: 'string' },
          title: { type: 'string' },
          goal: { type: 'string' },
          lessons: {
            type: 'array',
            minItems: 2,
            maxItems: 4,
            items: {
              type: 'object',
              additionalProperties: false,
              required: ['lesson_id', 'anchor_id', 'title', 'content_blocks'],
              properties: {
                lesson_id: { type: 'string' },
                anchor_id: { type: 'string' },
                title: { type: 'string' },
                content_blocks: {
                  type: 'array',
                  minItems: 2,
                  maxItems: 4,
                  items: {
                    type: 'object',
                    additionalProperties: false,
                    required: ['type', 'text'],
                    properties: {
                      type: {
                        type: 'string',
                        enum: ['paragraph', 'bullets', 'example', 'myth_vs_reality', 'definition'],
                      },
                      text: { type: 'string' },
                    },
                  },
                },
              },
            },
          },
          checklist: {
            type: 'object',
            additionalProperties: false,
            required: ['title', 'items'],
            properties: {
              title: { type: 'string' },
              items: {
                type: 'array',
                minItems: 3,
                maxItems: 5,
                items: { type: 'string' },
              },
            },
          },
          exercise: {
            type: 'object',
            additionalProperties: false,
            required: ['title', 'purpose', 'steps', 'expected_output'],
            properties: {
              title: { type: 'string' },
              purpose: { type: 'string' },
              steps: {
                type: 'array',
                minItems: 3,
                maxItems: 4,
                items: { type: 'string' },
              },
              expected_output: { type: 'string' },
            },
          },
          risk_box: {
            type: 'object',
            additionalProperties: false,
            required: ['title', 'points'],
            properties: {
              title: { type: 'string' },
              points: {
                type: 'array',
                minItems: 2,
                maxItems: 3,
                items: { type: 'string' },
              },
            },
          },
          module_summary: {
            type: 'object',
            additionalProperties: false,
            required: ['key_takeaways'],
            properties: {
              key_takeaways: {
                type: 'array',
                minItems: 2,
                maxItems: 3,
                items: { type: 'string' },
              },
            },
          },
        },
      },
    },
    diagrams: {
      type: 'array',
      minItems: 2,
      maxItems: 3,
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['diagram_id', 'title', 'what_it_shows', 'layout_notes', 'image_prompt', 'insert_after_anchor_id'],
        properties: {
          diagram_id: { type: 'string' },
          title: { type: 'string' },
          what_it_shows: { type: 'string' },
          layout_notes: { type: 'string' },
          image_prompt: { type: 'string' },
          insert_after_anchor_id: { type: 'string' },
        },
      },
    },
    one_page_summary: {
      type: 'object',
      additionalProperties: false,
      required: ['title', 'sections', 'print_note'],
      properties: {
        title: { type: 'string' },
        print_note: { type: 'string' },
        sections: {
          type: 'array',
          minItems: 4,
          maxItems: 6,
          items: {
            type: 'object',
            additionalProperties: false,
            required: ['heading', 'bullets'],
            properties: {
              heading: { type: 'string' },
              bullets: {
                type: 'array',
                minItems: 4,
                maxItems: 7,
                items: { type: 'string' },
              },
            },
          },
        },
      },
    },
    glossary: {
      type: 'array',
      minItems: 8,
      maxItems: 12,
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['term', 'plain_definition', 'why_it_matters'],
        properties: {
          term: { type: 'string' },
          plain_definition: { type: 'string' },
          why_it_matters: { type: 'string' },
        },
      },
    },
    quiz: {
      type: 'object',
      additionalProperties: false,
      required: ['title', 'questions'],
      properties: {
        title: { type: 'string' },
        questions: {
          type: 'array',
          minItems: 5,
          maxItems: 8,
          items: {
            type: 'object',
            additionalProperties: false,
            required: ['q', 'choices', 'correct_choice_index', 'explanation'],
            properties: {
              q: { type: 'string' },
              choices: {
                type: 'array',
                minItems: 4,
                maxItems: 4,
                items: { type: 'string' },
              },
              correct_choice_index: {
                type: 'integer',
                minimum: 0,
                maximum: 3,
              },
              explanation: { type: 'string' },
            },
          },
        },
      },
    },
    footer_and_versioning: {
      type: 'object',
      additionalProperties: false,
      required: ['header_rules', 'footer_rules', 'page_numbering'],
      properties: {
        header_rules: {
          type: 'object',
          additionalProperties: false,
          required: ['apply_from_section_anchor', 'left', 'right'],
          properties: {
            apply_from_section_anchor: { type: 'string' },
            left: { type: 'string' },
            right: { type: 'string' },
          },
        },
        footer_rules: {
          type: 'object',
          additionalProperties: false,
          required: ['apply_from_section_anchor', 'left', 'center', 'right'],
          properties: {
            apply_from_section_anchor: { type: 'string' },
            left: { type: 'string' },
            center: { type: 'string' },
            right: { type: 'string' },
          },
        },
        page_numbering: {
          type: 'object',
          additionalProperties: false,
          required: ['start_after_section_anchor', 'format'],
          properties: {
            start_after_section_anchor: { type: 'string' },
            format: { type: 'string' },
          },
        },
      },
    },
  },
} as const

/**
 * Optimized JSON Schema for AI Strategy generation
 * Further tightens limits to keep strategies compact and token-efficient
 */
export const AI_STRATEGY_JSON_SCHEMA = (() => {
  const schema: any = JSON.parse(JSON.stringify(CUSTOM_COURSE_JSON_SCHEMA))

  schema.properties.modules.minItems = 2
  schema.properties.modules.maxItems = 3
  schema.properties.modules.items.properties.lessons.minItems = 1
  schema.properties.modules.items.properties.lessons.maxItems = 3
  schema.properties.modules.items.properties.lessons.items.properties.content_blocks.minItems = 2
  schema.properties.modules.items.properties.lessons.items.properties.content_blocks.maxItems = 3
  schema.properties.modules.items.properties.checklist.properties.items.maxItems = 4
  schema.properties.modules.items.properties.exercise.properties.steps.minItems = 2
  schema.properties.modules.items.properties.exercise.properties.steps.maxItems = 3

  schema.properties.diagrams.minItems = 1
  schema.properties.diagrams.maxItems = 2

  schema.properties.one_page_summary.properties.sections.minItems = 3
  schema.properties.one_page_summary.properties.sections.maxItems = 4
  schema.properties.one_page_summary.properties.sections.items.properties.bullets.minItems = 3
  schema.properties.one_page_summary.properties.sections.items.properties.bullets.maxItems = 5

  schema.properties.glossary.minItems = 6
  schema.properties.glossary.maxItems = 10

  schema.properties.quiz.properties.questions.minItems = 4
  schema.properties.quiz.properties.questions.maxItems = 6

  return schema as typeof CUSTOM_COURSE_JSON_SCHEMA
})()

