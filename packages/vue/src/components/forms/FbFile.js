import { h, ref, computed } from 'vue'
import { PREFIX } from '@form-blocks/core/constants'

export default {
    name: 'FbFile',
    inheritAttrs: false,
    props: {
        modelValue: { type: [File, Array], default: null},
        multiple: { type: Boolean, default: false },
        state: { type: Boolean, default: null },
        showSize: { type: Boolean, default: true },
    },
    emits: ['update:modelValue', 'blur', 'focus'],
    setup(props, { emit, attrs }) {
        const ibControlClass = `${PREFIX}-input-block__control`
        const isDragging = ref(false)
        const inputRef = ref(null)

        const files = computed(() => {
            if (!props.modelValue) return []
            return Array.isArray(props.modelValue) ? props.modelValue : [props.modelValue] 
        })

        const formatSize = (bytes) => {
            if (!bytes) return '0 B'
            const units = ['B', 'KB', 'MB', 'GB']
            let size = bytes
            let i = 0
            while (size >= 1024 && i < units.length - 1) {
                size /= 1024
                i++
            }
            return `${size.toFixed(1)} ${units[i]}`
        }

        const setFiles = (fileList) => {
            const list = Array.from(fileList || [])
            if (!list.length) return
            emit('update:modelValue', props.multiple ? list : list[0])
        }

        const onChange = (event) => setFiles(event.target.files)

        const onDrop = (event) => {
            event.preventDefault()
            isDragging.value = false
            setFiles(event.dataTransfer.files)
        }

        const removeFile = (index) => {
            if (!props.multiple) {
                emit('update:modelValue', null)
                return
            }
            emit('update:modelValue', files.value.filter((_, i) => i !== index))
        }

        return () => {
            const fallbackId = `fb-file-${Math.random().toString(36).slice(2, 9)}`
            const id = attrs.id || fallbackId

            const inputNode = h('input', {
                ...attrs,
                ref: inputRef,
                id,
                type: 'file',
                multiple: props.multiple,
                class: `${PREFIX}-input-block__file-input`,
                onChange,
                onBlur: (e) => emit('blur', e),
                onFocus: (e) => emit('focus', e),
            })

            const dropzone = h('div', {
                class: [
                    ibControlClass,
                    `${PREFIX}-input-block__file-dropzone`,
                    {
                        [`${ibControlClass}--valid`]: props.state === true,
                        [`${ibControlClass}--invalid`]: props.state == false,
                        [`${PREFIX}-input-block__file-dropzone--dragging`]: isDragging.value,
                    }
                ],
                onDragover: (e) => { e.preventDefault(); isDragging.value = true },
                onDragleave: () => { isDragging.value = false },
                onDrop,
            }, [
              inputNode,
              h('span', { class: `${PREFIX}-input-block__file-placeholder` },
                files.value.length ? `${files.value.length} arquivos(s) selecionados(s)` : 'Clique ou arraste um arquivo'
              ),
            ])

            const fileList = files.value.length ? h('ul', { class: `${PREFIX}-input-block__file-list` },
                files.value.map((file, index) => h('li', { key: file.name + index, class: `${PREFIX}-input-block__file-item` }, [
                h('span', { class: `${PREFIX}-input-block__file-name` }, file.name),
                props.showSize ? h('span', { class: `${PREFIX}-input-block__file-size` }, formatSize(file.size)) : null,
                h('button', {
                    type: 'button',
                    class: `${PREFIX}-input-block__file-remove`,
                    onClick: () => removeFile(index)
                }, '×'),
                ]))
            ) : null

            return h('div', { class: `${PREFIX}-input-block__file-wrapper` }, [dropzone, fileList])
        }
    }
}