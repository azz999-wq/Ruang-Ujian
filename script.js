
        const STORAGE_KEY = 'denah-ujian-pro-state-v1';
        const STUDENT_CARD_LOGO_STORAGE_KEY = 'denah-ujian-student-card-logo-v1';
        let studentCardLogo = '';

        // Data State Utama
        let config = {
            roomCode: "R.005",
            roomName: "R. Pusaka",
            rows: 10,
            cols: 4,
            canvasOrientation: 'portrait',
            showPengawas: true,
            supervisorPosition: 'center',
            footerText: "SANTRI YANG TIDAK MASUK RUANGAN UJIAN HARAP KONFIRMASI BENDAHARA UJIAN & SEKRETARIS UJIAN"
        };

        // Data Peserta (Disimpan dalam Array of Object)
        let studentsList = [];
        // Map penempatan di meja: key "R-C" (cth: "1-1" untuk A1, "7-3" untuk G3)
        let gridData = {};
        let singleStudentCardOptions = [];
        
        let activeEditKey = null;

        // Sample Data sesuai gambar yang dilampirkan pengguna
        const SAMPLE_STUDENTS = [
            { name: "Agiansyah S. Maulana", grade: "1 TSANAWI", isRed: false },
            { name: "Alby Fahri A.", grade: "1 IBTIDA", isRed: false },
            { name: "Faris Alfarisi", grade: "2 IBTIDA", isRed: false },
            { name: "M. Zavier Evans", grade: "3 IBTIDA", isRed: false },
            { name: "Burhan", grade: "1 TSANAWI", isRed: false },
            { name: "Gilang Nugraha", grade: "2 TSANAWI", isRed: false },
            { name: "Iqbal", grade: "3 TSANAWI", isRed: false },
            { name: "Muhammad Adakiya N.", grade: "4 TSANAWI", isRed: false },
            { name: "Dzikri M. Fadhlan", grade: "1 IBTIDA", isRed: false },
            { name: "Rifan Lutfi F.", grade: "2 IBTIDA", isRed: false },
            { name: "M. Sabil Nuda", grade: "3 IBTIDA", isRed: false },
            { name: "Deni Ramdani", grade: "1 TSANAWI", isRed: false },
            { name: "Imam Mutaqin", grade: "2 IBTIDA", isRed: false },
            { name: "M. Faiz Fadhilah", grade: "3 TSANAWI", isRed: false },
            { name: "Muhammad Akbarudin", grade: "4 TSANAWI", isRed: false },
            { name: "Khairul Azam M.", grade: "2 IBTIDA", isRed: false },
            { name: "M. Alif Fauzan", grade: "3 IBTIDA", isRed: true },
            { name: "Devansyah", grade: "1 TSANAWI", isRed: false },
            { name: "Hasbi Mahesa", grade: "2 TSANAWI", isRed: false },
            { name: "M. Farel Budiman", grade: "3 TSANAWI", isRed: false },
            { name: "Muhammad Fahri Rahmani", grade: "4 TSANAWI", isRed: true },
            { name: "M. Hasbi Alghifary", grade: "2 IBTIDA", isRed: false },
            { name: "Rabban R. Ridwan", grade: "3 IBTIDA", isRed: false },
            { name: "Fathan Almaidan", grade: "1 TSANAWI", isRed: false },
            { name: "Iqbal Agustia", grade: "2 TSANAWI", isRed: false },
            { name: "Habibi Khairul", grade: "1 IBTIDA", isRed: false },
            { name: "Muhammad Daffa", grade: "2 IBTIDA", isRed: false },
            { name: "Muhammad Fahri", grade: "3 IBTIDA", isRed: false },
            { name: "Fikri Ardiansyah", grade: "1 TSANAWI", isRed: false },
            { name: "Kholid Padhil A.", grade: "2 TSANAWI", isRed: false },
            { name: "Muhammad Fajar M.", grade: "3 IBTIDA", isRed: false },
            { name: "M. Abdul Aziz", grade: "2 IBTIDA", isRed: false },
            { name: "Ibal Hidayatullah", grade: "2 TSANAWI", isRed: false },
            { name: "Majida Arjaei", grade: "2 IBTIDA", isRed: false },
            { name: "Muhammad Lutfi Farhan", grade: "3 TSANAWI", isRed: false },
            { name: "Muhammad Thoriq", grade: "3 IBTIDA", isRed: false },
            { name: "M. Agus Ramdan", grade: "2 IBTIDA", isRed: false }
        ];

        function saveCurrentState() {
            const state = {
                config,
                studentsList,
                gridData,
                selectedDistributionMethod: document.getElementById('select-distribution-method').value
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        }

        function showStudentCardLogoMessage(message, isError) {
            const messageElement = document.getElementById('student-card-logo-message');
            messageElement.textContent = message;
            messageElement.classList.remove('hidden', 'text-rose-600', 'text-emerald-700');
            messageElement.classList.add(isError ? 'text-rose-600' : 'text-emerald-700');
        }

        function updateStudentCardLogoPreview() {
            const preview = document.getElementById('student-card-logo-preview');
            const emptyMessage = document.getElementById('student-card-logo-empty');
            const removeButton = document.getElementById('remove-student-card-logo');

            if (studentCardLogo) {
                preview.src = studentCardLogo;
                preview.classList.remove('hidden');
                emptyMessage.classList.add('hidden');
                removeButton.classList.remove('hidden');
            } else {
                preview.removeAttribute('src');
                preview.classList.add('hidden');
                emptyMessage.classList.remove('hidden');
                removeButton.classList.add('hidden');
            }
        }

        function restoreStudentCardLogo() {
            try {
                studentCardLogo = localStorage.getItem(STUDENT_CARD_LOGO_STORAGE_KEY) || '';
                updateStudentCardLogoPreview();
            } catch (error) {
                console.error('Gagal memuat logo kartu dari penyimpanan browser:', error);
                showStudentCardLogoMessage('Tidak bisa membaca logo tersimpan dari browser ini.', true);
            }
        }

        function handleStudentLogoUpload(event) {
            const input = event.target;
            const file = input.files[0];
            if (!file) return;

            if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type)) {
                showStudentCardLogoMessage('Pilih file logo PNG, JPG, atau WEBP.', true);
                input.value = '';
                return;
            }

            if (file.size > 5 * 1024 * 1024) {
                showStudentCardLogoMessage('Ukuran file logo maksimal 5 MB.', true);
                input.value = '';
                return;
            }

            const reader = new FileReader();
            reader.onerror = function() {
                console.error('Gagal membaca file logo kartu.');
                showStudentCardLogoMessage('File logo tidak bisa dibaca. Coba pilih file lain.', true);
                input.value = '';
            };
            reader.onload = function() {
                const image = new Image();
                image.onerror = function() {
                    showStudentCardLogoMessage('File yang dipilih bukan gambar yang valid.', true);
                    input.value = '';
                };
                image.onload = function() {
                    const maxDimension = 512;
                    const scale = Math.min(1, maxDimension / Math.max(image.naturalWidth, image.naturalHeight));
                    const canvas = document.createElement('canvas');
                    canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
                    canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
                    canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);

                    const compressedLogo = canvas.toDataURL('image/webp', 0.85);
                    try {
                        localStorage.setItem(STUDENT_CARD_LOGO_STORAGE_KEY, compressedLogo);
                        studentCardLogo = compressedLogo;
                        updateStudentCardLogoPreview();
                        showStudentCardLogoMessage('Logo tersimpan di browser ini.', false);
                    } catch (error) {
                        console.error('Gagal menyimpan logo kartu ke browser:', error);
                        showStudentCardLogoMessage('Logo tidak bisa disimpan. Coba gambar yang lebih kecil atau hapus data situs di browser.', true);
                    }
                    input.value = '';
                };
                image.src = reader.result;
            };
            reader.readAsDataURL(file);
        }

        function removeStudentCardLogo() {
            try {
                localStorage.removeItem(STUDENT_CARD_LOGO_STORAGE_KEY);
                studentCardLogo = '';
                updateStudentCardLogoPreview();
                showStudentCardLogoMessage('Logo dihapus. Kartu akan dicetak tanpa watermark.', false);
            } catch (error) {
                console.error('Gagal menghapus logo kartu dari browser:', error);
                showStudentCardLogoMessage('Logo tidak bisa dihapus dari penyimpanan browser.', true);
            }
        }


        function restoreState() {
            restoreStudentCardLogo();
            const saved = localStorage.getItem(STORAGE_KEY);
            if (!saved) {
                loadSampleData();
                return;
            }

            try {
                const state = JSON.parse(saved);
                if (!state || !state.config) {
                    loadSampleData();
                    return;
                }

                config = { ...config, ...state.config };
                normalizeGridDimensions();
                normalizeCanvasOrientation();
                normalizeSupervisorPosition();
                studentsList = Array.isArray(state.studentsList) ? state.studentsList : [];
                gridData = state.gridData || {};

                document.getElementById('input-room-code').value = config.roomCode;
                document.getElementById('input-room-name').value = config.roomName;
                document.getElementById('input-rows').value = config.rows;
                document.getElementById('input-cols').value = config.cols;
                document.getElementById('input-footer-text').value = config.footerText;
                document.getElementById('check-enable-pengawas').checked = !!config.showPengawas;
                document.getElementById('select-supervisor-position').value = config.supervisorPosition;
                document.getElementById('select-distribution-method').value = state.selectedDistributionMethod || 'zigzag';

                updateHeader();
                updateFooter();
                togglePengawas();
                applyCanvasOrientation();
                applySupervisorPosition();
                updateStudentTextarea();
                renderGrid();
            } catch (error) {
                console.error('Gagal memuat data tersimpan:', error);
                localStorage.removeItem(STORAGE_KEY);
                loadSampleData();
            }
        }

        function exportState() {
            const state = {
                config,
                studentsList,
                gridData,
                exportedAt: new Date().toISOString()
            };

            const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `denah-ujian-${config.roomCode || 'ruangan'}.json`;
            document.body.appendChild(link);
            link.click();
            link.remove();
            URL.revokeObjectURL(url);
        }

        function importStateFromFile(event) {
            const file = event.target.files?.[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const imported = JSON.parse(e.target.result);
                    applyImportedState(imported);
                    alert('Data denah berhasil diimpor.');
                } catch (error) {
                    alert('File yang dipilih tidak valid. Pastikan file JSON hasil ekspor denah.');
                } finally {
                    event.target.value = '';
                }
            };
            reader.readAsText(file);
        }

        function applyImportedState(imported) {
            if (!imported || !imported.config) {
                throw new Error('Invalid imported data');
            }

            config = { ...config, ...imported.config };
            normalizeGridDimensions();
            normalizeCanvasOrientation();
            normalizeSupervisorPosition();
            studentsList = Array.isArray(imported.studentsList) ? imported.studentsList : [];
            gridData = imported.gridData || {};

            document.getElementById('input-room-code').value = config.roomCode;
            document.getElementById('input-room-name').value = config.roomName;
            document.getElementById('input-rows').value = config.rows;
            document.getElementById('input-cols').value = config.cols;
            document.getElementById('input-footer-text').value = config.footerText;
            document.getElementById('check-enable-pengawas').checked = !!config.showPengawas;
            document.getElementById('select-supervisor-position').value = config.supervisorPosition;

            updateHeader();
            updateFooter();
            togglePengawas();
            applyCanvasOrientation();
            applySupervisorPosition();
            updateStudentTextarea();
            renderGrid();
            saveCurrentState();
        }

        function escapeHTML(value) {
            return String(value).replace(/[&<>"']/g, character => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#39;'
            })[character]);
        }

        function normalizeGridDimensions() {
            config.rows = Math.max(1, Number.parseInt(config.rows, 10) || 10);
            config.cols = Math.min(8, Math.max(1, Number.parseInt(config.cols, 10) || 4));
        }

        function normalizeCanvasOrientation() {
            if (!['portrait', 'landscape'].includes(config.canvasOrientation)) {
                config.canvasOrientation = 'portrait';
            }
        }

        function applyCanvasOrientation() {
            normalizeCanvasOrientation();
            document.getElementById('main-app').classList.toggle('landscape-mode', config.canvasOrientation === 'landscape');
            document.querySelectorAll('[data-canvas-orientation]').forEach(button => {
                button.setAttribute('aria-pressed', String(button.dataset.canvasOrientation === config.canvasOrientation));
            });
        }

        function setCanvasOrientation(orientation) {
            config.canvasOrientation = orientation;
            applyCanvasOrientation();
            saveCurrentState();
        }

        function normalizeSupervisorPosition() {
            if (!['left', 'center', 'right'].includes(config.supervisorPosition)) {
                config.supervisorPosition = 'center';
            }
        }

        function applySupervisorPosition() {
            const wrapper = document.getElementById('pengawas-position-wrapper');
            const positionClasses = {
                left: 'justify-start',
                center: 'justify-center',
                right: 'justify-end'
            };
            wrapper.classList.remove('justify-start', 'justify-center', 'justify-end');
            wrapper.classList.add(positionClasses[config.supervisorPosition]);
        }

        function updateSupervisorPosition() {
            config.supervisorPosition = document.getElementById('select-supervisor-position').value;
            normalizeSupervisorPosition();
            applySupervisorPosition();
            saveCurrentState();
        }

        function getRowLabel(rowNumber) {
            let label = '';
            let remaining = rowNumber;
            while (remaining > 0) {
                remaining--;
                label = String.fromCharCode(65 + remaining % 26) + label;
                remaining = Math.floor(remaining / 26);
            }
            return label;
        }

        function buildStudentCardsHTML(selectedKey = null) {
            const cards = [];
            for (let r = 1; r <= config.rows; r++) {
                for (let c = 1; c <= config.cols; c++) {
                    const key = `${r}-${c}`;
                    const deskData = gridData[key] || {};
                    if (selectedKey && key !== selectedKey) continue;
                    if (deskData.empty || (!deskData.name && !deskData.grade)) continue;

                    const rowLabel = getRowLabel(r);
                    const status = deskData.isRed
                        ? '<div class="student-card-grade student-card-status">STATUS KHUSUS</div>'
                        : '';
                    const supervisorSignatures = Array.from({ length: 5 }, (_, dayIndex) => `
                        <div class="student-card-sign-day">
                            <span>Hari ${dayIndex + 1}</span>
                            <span class="student-card-sign-line"></span>
                        </div>
                    `).join('');
                    cards.push(`
                        <article class="student-card"${studentCardLogo ? ` style="--student-card-watermark: url('${studentCardLogo}')"` : ''}>
                            <div class="student-card-header">
                                <div class="student-card-title">Kartu Peserta Ujian</div>
                                <div class="student-card-room">${escapeHTML(config.roomCode)}<br>${escapeHTML(config.roomName)}</div>
                            </div>
                            <div class="student-card-identity">
                                <div class="student-card-details">
                                    <div class="student-card-name">${escapeHTML(deskData.name || '-')}</div>
                                    <div class="student-card-grade">${escapeHTML(deskData.grade || '-')}</div>
                                    ${status}
                                </div>
                                <div class="student-card-seat-box">${rowLabel}${c}</div>
                            </div>
                            <div class="student-card-signatures">
                                <div class="student-card-sign-title"><i class="fa-solid fa-pen-nib" aria-hidden="true"></i> Tanda tangan pengawas</div>
                                <div class="student-card-sign-days">${supervisorSignatures}</div>
                            </div>
                            <div class="student-card-rule">Kartu hilang dikenakan denda Rp5.000.</div>
                        </article>
                    `);
                }
            }

            return cards.join('');
        }

        function getStudentCardOptions() {
            const options = [];
            for (let r = 1; r <= config.rows; r++) {
                for (let c = 1; c <= config.cols; c++) {
                    const key = `${r}-${c}`;
                    const deskData = gridData[key] || {};
                    if (deskData.empty || (!deskData.name && !deskData.grade)) continue;

                    const label = `${getRowLabel(r)}${c} - ${deskData.name || '-'} (${deskData.grade || '-'})`;
                    options.push({
                        key,
                        label,
                        searchText: `${key} ${label}`.toLocaleLowerCase()
                    });
                }
            }
            return options;
        }

        function filterStudentCardOptions() {
            const search = document.getElementById('single-student-card-search');
            const select = document.getElementById('single-student-card-select');
            const previousSelection = select.value;
            const query = search.value.trim().toLocaleLowerCase();
            const matches = singleStudentCardOptions.filter(option => option.searchText.includes(query));

            select.replaceChildren(...matches.map(option => {
                const element = document.createElement('option');
                element.value = option.key;
                element.textContent = option.label;
                return element;
            }));

            const hasPreviousSelection = matches.some(option => option.key === previousSelection);
            if (matches.length) {
                select.value = hasPreviousSelection ? previousSelection : matches[0].key;
            }

            document.getElementById('single-student-card-print-button').disabled = matches.length === 0;
            document.getElementById('single-student-card-count').textContent = matches.length
                ? `${matches.length} peserta ditemukan`
                : 'Peserta tidak ditemukan';
        }

        function openSingleStudentCardModal() {
            singleStudentCardOptions = getStudentCardOptions();
            if (!singleStudentCardOptions.length) {
                alert('Belum ada peserta yang memiliki tempat duduk.');
                return;
            }

            document.getElementById('single-student-card-search').value = '';
            document.getElementById('single-student-card-select').value = '';
            filterStudentCardOptions();
            document.getElementById('single-student-card-modal').classList.remove('hidden');
            document.getElementById('single-student-card-search').focus();
        }

        function closeSingleStudentCardModal() {
            document.getElementById('single-student-card-modal').classList.add('hidden');
        }

        function prepareStudentCardsPrint() {
            const printStyle = document.createElement('style');
            printStyle.id = 'student-cards-page-style';
            printStyle.textContent = '@page { size: 210mm 330mm; margin: 5mm 10mm; }';
            document.head.appendChild(printStyle);
            document.body.classList.add('print-student-cards-mode');
        }

        function printSelectedStudentCard() {
            const selectedKey = document.getElementById('single-student-card-select').value;
            if (!selectedKey) return;
            const target = document.getElementById('student-cards-print');
            target.innerHTML = buildStudentCardsHTML(selectedKey);
            if (!target.childElementCount) {
                alert('Kartu peserta tidak ditemukan.');
                return;
            }

            closeSingleStudentCardModal();
            prepareStudentCardsPrint();
            window.print();
        }

        function printStudentCards() {
            const target = document.getElementById('student-cards-print');
            target.innerHTML = buildStudentCardsHTML();
            if (!target.childElementCount) {
                alert('Belum ada peserta yang memiliki tempat duduk.');
                return;
            }
            prepareStudentCardsPrint();
            window.print();
        }

        window.addEventListener('afterprint', function() {
            document.body.classList.remove('print-student-cards-mode');
            document.getElementById('canvas-orientation-print-style')?.remove();
            document.getElementById('student-cards-page-style')?.remove();
            const target = document.getElementById('student-cards-print');
            target.innerHTML = '';
        });

        function printPage() {
            const printStyle = document.createElement('style');
            printStyle.id = 'canvas-orientation-print-style';
            const pageSize = config.canvasOrientation === 'landscape' ? '330mm 210mm' : '210mm 330mm';
            printStyle.textContent = `
                @page { size: ${pageSize}; }
                @media print {
                    #main-app {
                        display: block !important;
                        width: 100% !important;
                        max-width: none !important;
                        margin: 0 !important;
                        padding: 0 !important;
                    }
                    #main-app > section {
                        width: 100% !important;
                        margin: 0 !important;
                    }
                    #print-sheet {
                        width: 100% !important;
                        max-width: 100% !important;
                        min-height: 0 !important;
                        aspect-ratio: auto !important;
                    }
                }
            `;
            document.head.appendChild(printStyle);
            window.print();
        }

        document.addEventListener('keydown', function(event) {
            const isF4 = event.key === 'F4' || event.code === 'F4';
            if (isF4) {
                event.preventDefault();
                printPage();
            }
        });

        // Inisialisasi Saat Halaman Di-load
        window.onload = function() {
            restoreState();
        };

        // Switch Tab UI
        function switchTab(tabIndex) {
            const btn1 = document.getElementById('tab-btn-1');
            const btn2 = document.getElementById('tab-btn-2');
            const content1 = document.getElementById('tab-content-1');
            const content2 = document.getElementById('tab-content-2');

            if (tabIndex === 1) {
                btn1.className = "flex-1 py-3 text-center border-b-2 border-brand-600 font-semibold text-brand-600 bg-white";
                btn2.className = "flex-1 py-3 text-center border-b-2 border-transparent text-slate-500 hover:text-slate-700";
                content1.classList.remove('hidden');
                content2.classList.add('hidden');
            } else {
                btn2.className = "flex-1 py-3 text-center border-b-2 border-brand-600 font-semibold text-brand-600 bg-white";
                btn1.className = "flex-1 py-3 text-center border-b-2 border-transparent text-slate-500 hover:text-slate-700";
                content2.classList.remove('hidden');
                content1.classList.add('hidden');
            }
        }

        const STUDENT_CLASSES = [
            'SP',
            '1 IBTIDA',
            '2 IBTIDA',
            '3 IBTIDA',
            '1 TSANAWI',
            '2 TSANAWI',
            '3 TSANAWI',
            '4 TSANAWI'
        ];

        // Format input peserta per kelas
        function updateStudentTextarea() {
            document.querySelectorAll('[data-student-grade]').forEach(input => {
                const grade = input.dataset.studentGrade.toUpperCase();
                input.value = studentsList
                    .filter(student => String(student.grade || '').trim().toUpperCase() === grade)
                    .map(student => `${student.name}${student.isRed ? ' | merah' : ''}`)
                    .join('\n');
            });

            const knownGrades = new Set(STUDENT_CLASSES.map(grade => grade.toUpperCase()));
            document.getElementById('students-other').value = studentsList
                .filter(student => !knownGrades.has(String(student.grade || '').trim().toUpperCase()))
                .map(student => `${student.name} | ${student.grade}${student.isRed ? ' | merah' : ''}`)
                .join('\n');
            document.getElementById('count-badge').textContent = studentsList.length;
        }

        // Load Sample Data (Persis seperti denah lama pengguna, dengan pengawas di depan)
        function loadSampleData() {
            studentsList = [...SAMPLE_STUDENTS];
            updateStudentTextarea();
            
            config.rows = 10;
            config.cols = 4;
            config.showPengawas = true;
            config.supervisorPosition = 'center';

            document.getElementById('input-rows').value = 10;
            document.getElementById('input-cols').value = 4;
            document.getElementById('check-enable-pengawas').checked = true;
            document.getElementById('select-supervisor-position').value = config.supervisorPosition;
            applySupervisorPosition();

            // Indeks peserta per kursi; null menandai kursi kosong.
            const sampleSeating = [
                [0, 1, 2, null], [3, 4, 5, 6], [7, 8, 9, 10],
                [11, 12, 13, 14], [15, 16, 17, 18], [19, 20, 21, null],
                [22, 23, null, 24], [25, 26, 27, 28], [29, 30, 31, 32],
                [33, 34, 35, 36]
            ];
            gridData = Object.fromEntries(sampleSeating.flatMap((row, rowIndex) =>
                row.map((studentIndex, colIndex) => [
                    `${rowIndex + 1}-${colIndex + 1}`,
                    studentIndex === null ? { empty: true } : { ...SAMPLE_STUDENTS[studentIndex] }
                ])
            ));

            renderGrid();
            saveCurrentState();
        }

        // Parse semua input kelas menjadi daftar peserta
        function parseAndSaveStudents() {
            const parsed = [];

            function parseLines(rawText, fixedGrade) {
                rawText.split('\n').forEach(line => {
                    const parts = line.trim().split('|').map(part => part.trim());
                    const name = parts[0] || '';
                    if (!name) return;

                    const grade = fixedGrade || parts[1] || '';
                    const tag = fixedGrade
                        ? (parts[2] || parts[1] || '').toLowerCase()
                        : (parts[2] || '').toLowerCase();
                    parsed.push({
                        name,
                        grade,
                        isRed: tag === 'merah' || tag === 'red'
                    });
                });
            }

            document.querySelectorAll('[data-student-grade]').forEach(input => {
                parseLines(input.value, input.dataset.studentGrade);
            });
            parseLines(document.getElementById('students-other').value, '');

            studentsList = parsed;
            document.getElementById('count-badge').textContent = studentsList.length;
            autoDistribute();
            saveCurrentState();
        }

        // Update Header & Footer Text
        function updateHeader() {
            config.roomCode = document.getElementById('input-room-code').value || "R.000";
            config.roomName = document.getElementById('input-room-name').value || "Nama Ruang";

            document.getElementById('display-room-code').textContent = config.roomCode;
            document.getElementById('display-room-name').textContent = config.roomName;
            document.getElementById('display-room-name-sub').textContent = config.roomName.toUpperCase();
            saveCurrentState();
        }

        function updateFooter() {
            config.footerText = document.getElementById('input-footer-text').value;
            document.getElementById('display-footer-text').textContent = config.footerText;
            saveCurrentState();
        }

        function togglePengawas() {
            config.showPengawas = document.getElementById('check-enable-pengawas').checked;
            const pengawasContainer = document.getElementById('pengawas-container');
            if (config.showPengawas) {
                pengawasContainer.classList.remove('hidden');
            } else {
                pengawasContainer.classList.add('hidden');
            }
            saveCurrentState();
        }

        // Generate Grid Kosong Berdasarkan Ukuran Baris & Kolom
        function generateGrid() {
            config.rows = parseInt(document.getElementById('input-rows').value) || 10;
            config.cols = parseInt(document.getElementById('input-cols').value) || 4;
            normalizeGridDimensions();
            document.getElementById('input-rows').value = config.rows;
            document.getElementById('input-cols').value = config.cols;
            renderGrid();
            saveCurrentState();
        }

        // Otomatis Mendistribusikan Peserta ke Meja
        function autoDistribute() {
            const method = document.getElementById('select-distribution-method').value;
            gridData = {};

            if (studentsList.length === 0) {
                renderGrid();
                saveCurrentState();
                return;
            }

            let pool = [...studentsList];

            // Jika metode Zig-zag, kita kelompokkan berdasarkan kelas lalu ambil bergantian
            if (method === 'zigzag') {
                const grouped = {};
                pool.forEach(s => {
                    const g = s.grade.toUpperCase();
                    if (!grouped[g]) grouped[g] = [];
                    grouped[g].push(s);
                });

                const grades = Object.keys(grouped);
                const interleave = [];
                let maxLength = Math.max(...Object.values(grouped).map(arr => arr.length));

                for (let i = 0; i < maxLength; i++) {
                    grades.forEach(g => {
                        if (grouped[g][i]) {
                            interleave.push(grouped[g][i]);
                        }
                    });
                }
                pool = interleave;
            }

            let studentIdx = 0;

            if (method === 'snake') {
                // Pola Ular (S-Type)
                for (let r = 1; r <= config.rows; r++) {
                    const isEven = r % 2 === 0;
                    const startCol = isEven ? config.cols : 1;
                    const endCol = isEven ? 1 : config.cols;
                    const step = isEven ? -1 : 1;

                    for (let c = startCol; isEven ? c >= endCol : c <= endCol; c += step) {
                        const key = `${r}-${c}`;
                        if (studentIdx < pool.length) {
                            gridData[key] = { ...pool[studentIdx] };
                            studentIdx++;
                        } else {
                            gridData[key] = { empty: true };
                        }
                    }
                }
            } else {
                // Baris demi Baris biasa
                for (let r = 1; r <= config.rows; r++) {
                    for (let c = 1; c <= config.cols; c++) {
                        const key = `${r}-${c}`;
                        if (studentIdx < pool.length) {
                            gridData[key] = { ...pool[studentIdx] };
                            studentIdx++;
                        } else {
                            gridData[key] = { empty: true };
                        }
                    }
                }
            }

            renderGrid();
            saveCurrentState();
        }

        // Render UI Grid Denah Meja
        function renderGrid() {
            const gridContainer = document.getElementById('grid-container');
            const colHeadersContainer = document.getElementById('col-headers-container');
            const nameFontSize = Math.max(9, Math.round(14 - config.cols * 0.625));
            const gradeFontSize = Math.max(8, Math.round(11 - config.cols * 0.375));

            gridContainer.innerHTML = '';
            colHeadersContainer.innerHTML = '';

            // Render Header Angka Kolom (1, 2, 3, 4...)
            for (let c = 1; c <= config.cols; c++) {
                const colLabel = document.createElement('div');
                colLabel.className = "flex-1 text-center font-bold text-slate-800 text-xs sm:text-sm bg-slate-200/80 rounded py-0.5 border border-slate-300";
                colLabel.textContent = c;
                colHeadersContainer.appendChild(colLabel);
            }

            // Render Tiap Baris (A, B, C...)
            for (let r = 1; r <= config.rows; r++) {
                const rowChar = getRowLabel(r);
                
                const rowDiv = document.createElement('div');
                rowDiv.className = "denah-row flex items-center gap-2 sm:gap-3";

                // Label Abjad Baris
                const rowLabel = document.createElement('div');
                rowLabel.className = "w-5 sm:w-6 text-center font-bold text-slate-800 text-xs sm:text-sm bg-slate-200/80 rounded py-1 border border-slate-300 shrink-0";
                rowLabel.textContent = rowChar;
                rowDiv.appendChild(rowLabel);

                // Render Meja dalam Baris ini
                for (let c = 1; c <= config.cols; c++) {
                    const key = `${r}-${c}`;
                    const deskData = gridData[key] || {};

                    const deskCard = document.createElement('div');
                    deskCard.className = "min-w-0 flex-1 desk-card bg-white border border-slate-900 rounded text-center overflow-hidden cursor-pointer hover:ring-2 hover:ring-brand-500 transition flex flex-col justify-between min-h-[46px] sm:min-h-[52px]";
                    deskCard.onclick = () => openEditModal(r, c);

                    // Check jika meja kosong
                    if (deskData.empty || (!deskData.name && !deskData.grade)) {
                        deskCard.classList.add('opacity-30', 'bg-slate-50', 'border-dashed');
                        deskCard.innerHTML = `<div class="p-2 text-[10px] text-slate-400 italic flex items-center justify-center h-full">Kosong</div>`;
                    } 
                    // Meja Berisi Peserta
                    else {
                        const isRedClass = deskData.isRed ? "text-rose-600 font-bold" : "text-slate-800 font-medium";
                        
                        deskCard.innerHTML = `
                            <div class="min-w-0 whitespace-normal break-words px-1 py-1 ${isRedClass} border-b border-slate-300 leading-tight" style="font-size: ${nameFontSize}px">
                                ${deskData.name || '-'}
                            </div>
                            <div class="min-w-0 whitespace-normal break-words px-1 py-0.5 font-semibold text-slate-900 uppercase tracking-tight bg-slate-50" style="font-size: ${gradeFontSize}px">
                                ${deskData.grade || '-'}
                            </div>
                        `;
                    }

                    rowDiv.appendChild(deskCard);
                }

                gridContainer.appendChild(rowDiv);
            }
        }

        // Modal Edit Desk Manual
        function openEditModal(r, c) {
            activeEditKey = `${r}-${c}`;
            const rowChar = String.fromCharCode(64 + r);
            document.getElementById('modal-title').textContent = `Edit Meja ${rowChar}${c}`;

            const data = gridData[activeEditKey] || {};
            document.getElementById('modal-student-name').value = data.name || '';
            document.getElementById('modal-student-grade').value = data.grade || '';
            document.getElementById('modal-is-red').checked = !!data.isRed;
            document.getElementById('modal-is-empty').checked = !!data.empty;

            document.getElementById('edit-modal').classList.remove('hidden');
        }

        function closeModal() {
            document.getElementById('edit-modal').classList.add('hidden');
            activeEditKey = null;
        }

        function saveDeskChanges() {
            if (!activeEditKey) return;

            const name = document.getElementById('modal-student-name').value.trim();
            const grade = document.getElementById('modal-student-grade').value.trim();
            const isRed = document.getElementById('modal-is-red').checked;
            const isEmpty = document.getElementById('modal-is-empty').checked;

            if (isEmpty) {
                gridData[activeEditKey] = { empty: true };
            } else {
                gridData[activeEditKey] = { name, grade, isRed, empty: false };
            }

            closeModal();
            renderGrid();
            saveCurrentState();
        }

        function clearSingleDesk() {
            if (!activeEditKey) return;
            gridData[activeEditKey] = { empty: true };
            closeModal();
            renderGrid();
            saveCurrentState();
        }

        function resetData() {
            if (confirm("Apakah Anda yakin ingin mengosongkan denah ruangan?")) {
                studentsList = [];
                gridData = {};
                updateStudentTextarea();
                renderGrid();
                saveCurrentState();
                localStorage.removeItem(STORAGE_KEY);
            }
        }
