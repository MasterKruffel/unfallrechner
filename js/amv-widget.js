/**
 * Created by thomasschuessler on 31.03.16.
 */


$(document).ready(function () {

    var selectBoxes = ['#select1', '#select2', '#select3', '#select4', '#select5'];
    var reversedBoxes = ['#select5', '#select4', '#select3', '#select2', '#select1'];
    var possibleIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48];
    var deSelectByImage = false;
    var lastSelectedGlied = {
        '#select1': false,
        '#select2': false,
        '#select3': false,
        '#select4': false,
        '#select5': false,
    };
    var selectedGliedCount = 0;
    var gliedLimit = 5;

	widget.notifyContentIsReady();
	
	function initProgression(newValue) 
	{
		$(".js-progression-select").val(newValue);
		__update_progression_select();
	}

    function fillSelectBoxes(isImprovedTax) {
        $.each(selectBoxes, function (i, selectId) {
            $.each(options, function (n, option) {
                var selectBox = $(selectId);
                var taxValue = 0;

                if (isImprovedTax) {
                    taxValue = option.improvedTax;
                } else {
                    taxValue = option.tax;
                }

                var optionHtml = "<option ";
                optionHtml += "data-id='" + n + "' ";
                optionHtml += "data-tax='" + taxValue + "' ";
                optionHtml += "data-name='" + option.name + "' ";
                optionHtml += "></option>";

                selectBox.append(
                    $(optionHtml).val(n).html(option.name + " " + taxValue + "%")
                );
            });
        });
    }

    function initSelectBoxes() {
        $.each(selectBoxes, function (i, selectId) {
            var selectBox = $(selectId);
            var selectButton = $(selectId + "-button");

            // Select-Box
            $(selectBox).selectpicker();

            // Deselect option
            $(selectButton).on('click', function (e) {
                deSelectByImage = false;

                $(selectBox).selectpicker('deselectAll');
            });

            $(selectBox).on('mousedown', function (e) {
                $(this).blur();
                e.preventDefault();
            });

            // Select Event
            $(selectBox).on('changed.bs.select', function (e) {

                var selectedOption = $(selectBox).find('option:selected');
                var selectedOptionId = selectedOption.val();

                if (selectedOptionId == "") {

                    // Ist deselect
                    if (deSelectByImage) {
                        deSelectByImage = false; // Is set in gliedDeSelectbyImage()
                    } else {
                        if ($(selectBox).data('gliedId') > 0) {
                            gliedDeSelect($(selectBox).data('gliedId'));
                        }
                    }


                } else {
                    selectByOption(selectedOptionId, this);
                }

                calcResults();
            });
        });

        $('#select-group-1').show();
        $('#select-group-2').hide();
        $('#select-group-3').hide();
        $('#select-group-4').hide();
        $('#select-group-5').hide();
	}

    function gliedSelect(gliedId) {
        var glied = glieder[gliedId];

        // Glied anzeigen
        $('.glied-' + gliedId).show();
        glieder[gliedId].selected = true;

        if (glied.group) {
            var group = groups[glied.group];

            if (group.singleSelect) {
                // Andere Bilder der Gruppe verstecken, wenn singleSelect-Gruppe
                $.each(group.gliederIDs, function (i, groupGliedId) {
                    if (groupGliedId == gliedId) return;
                    $('.glied-' + groupGliedId).hide();
                    glieder[groupGliedId].selected = false;
                });
            }

            if (group.children) {
                // Child-Glieder der Gruppe verstecken
                $.each(group.children, function (i, childGliedId) {
                    $('.glied-' + childGliedId).hide();
                    glieder[childGliedId].selected = false;
                });
            }
        }

        if (glied.parentGroup) {
            var parentGroup = groups[glied.parentGroup]
            // Glieder der Parent-Gruppe verstecken
            $.each(parentGroup.gliederIDs, function (i, parentGliedId) {
                $('.glied-' + parentGliedId).hide();
                glieder[parentGliedId].selected = false;
            });

            $('.glied-big-group-' + glied.parentGroup).hide();
        }

        // Alle "affectedIds" des Gliedes aus "possibleIds" entfernen
        $.each(glied.affectedIds, function (i, id) {
            var idx = possibleIds.indexOf(id);
            if (idx != -1) {
                possibleIds.splice(idx, 1);
            }
        });

    }

    function gliedDeSelect(gliedId) {

        $('.glied-' + gliedId).hide();
        glieder[gliedId].selected = false;

        var glied = glieder[gliedId];

        // IDs des Gliedes wieder in possibleIDs aufnehmen
        $.each(glied.affectedIds, function (i, id) {
            var idx = possibleIds.indexOf(id);
            if (idx == -1) {
                possibleIds.push(id);
            }
        });

        // Selectbox suchen, die die Option zu diesem Glied anzeigt
        $.each(selectBoxes, function (i, selectId) {
            var selectBox = $(selectId);

            if ($(selectBox).data('gliedId') == gliedId) {
                deselectBox(selectId);
            }
        });

        var group = glieder[gliedId].group;
        $('.glied-big-group-' + group).hide();

        checkKidney();
    }

    function selectByOption(newSelectedOptionId, selectedInBox) {
        var newSelectedOption = options[newSelectedOptionId];
        var selectedInBoxId = "#" + $(selectedInBox).attr("id");
        var selectHappend = false;
        var possibleGlied = false;

        // Nächstes mögliches Glied
        $.each(newSelectedOption.glieder, function (i, gliedId) {

            if (possibleGlied) return;

            if (possibleIds.indexOf(gliedId) != -1) {
                possibleGlied = gliedId;
            }
        });


        if (possibleGlied) {
            gliedSelect(possibleGlied);
        }

        // data attribute des select-elements aktualisieren
        $(selectedInBox).data('selectedOption', newSelectedOptionId);
        $(selectedInBox).data('gliedId', possibleGlied);
        $(selectedInBox).data('groupId', glieder[possibleGlied].group);


        var selectedGliedBeforeChange = lastSelectedGlied[selectedInBoxId];

        if (selectedGliedBeforeChange) {
            $('.glied-' + selectedGliedBeforeChange).hide();

            // IDs des Gliedes wieder in possibleIDs aufnehmen
            $.each(glieder[selectedGliedBeforeChange].affectedIds, function (i, id) {
                var idx = possibleIds.indexOf(id);
                if (idx == -1) {
                    possibleIds.push(id);
                }
            });
        }
        lastSelectedGlied[selectedInBoxId] = possibleGlied;

        checkKidney();

        // Verzögern für bessere Performance
        setTimeout(function () {
            cleanUpSelectBoxes();
        }, 300);
    }

    /*
     * Select-Boxen: Sichtbarkeiten anhand der possibleIds-Liste einstellen
     * Hier werden nicht die Auswahlen eingestellt, nur die sichtbarkeiten der Optionen
     */
    function cleanUpSelectBoxes() {
        $.each(options, function (optionId, option) {

            var optionVisible = false;

            // Ist eines der Glieder der Option in der possibleIds-Liste?
            $.each(option.glieder, function (k, gliedId) {
                if (possibleIds.indexOf(gliedId) != -1) {
                    optionVisible = true;
                }
            });

            if (optionVisible) {
                $.each(selectBoxes, function (n, selectId) {
                    var selectBox = $(selectId);
                    $(selectBox).find("[data-id='" + optionId + "']").show();
                    $(selectBox).selectpicker('refresh');
                });
            } else {
                $.each(selectBoxes, function (n, selectId) {
                    var selectBox = $(selectId);
                    $(selectBox).find("[data-id='" + optionId + "']").hide();
                    $(selectBox).selectpicker('refresh');
                });
            }
        });
    }

    function removeOptionsHTML() {
        $.each(selectBoxes, function (i, selectId) {
            var selectBox = $(selectId);

            selectBox.each(function () {
                $(this).html('');
            });

            $(selectBox).selectpicker('refresh');
        });
    }

    function refreshAllSelects() {
        $.each(selectBoxes, function (i, selectId) {
            var selectBox = $(selectId);

            $(selectBox).selectpicker('refresh');
        });
    }

    function resetAllActiveParts() {
        $.each(glieder, function (i) {
            gliedDeSelect(i);
        });

        cleanUpSelectBoxes();
    }

    /*
     *
     *     Berechnung
     *
     */

    function calcResults() {

        selectedGliedCount = 0;
        $.each(glieder, function (i, glied) {
            if (glied.selected) selectedGliedCount++;
        });

        // Einblenden der Selectboxen bei der ersten Auswahl
        for (i = 0; i <= (selectedGliedCount + 1); i++) {
            $('#select-group-' + i).show();
        }


        var lastWasEmpty = false;
        var lastBoxId;
        var leaveLoop = false;
        $.each(reversedBoxes, function (i, selectId) {
            if (leaveLoop) return;

            var selectBox = $(selectId);
            var selectedOption = $(selectBox).find('option:selected');

            if (lastWasEmpty && !selectedOption.data('tax')) {
                var selectGroup = '#select-group-' + lastBoxId.slice(-1);
                $(selectGroup).hide();
            }

            if (!selectedOption.data('tax')) {
                lastWasEmpty = true;
            } else {
                lastWasEmpty = false;
                leaveLoop = true;
            }

            lastBoxId = selectId;
        });


        var invaliditaetSum = 0;
        var leistung = 0;

        $.each(selectBoxes, function (i, selectId) {
            var selectBox = $(selectId);
            var selectedOption = $(selectBox).find('option:selected');

            if (selectedOption.data('tax')) {
                invaliditaetSum += parseInt(selectedOption.data('tax'));
            }
        });


        if (invaliditaetSum > 100) invaliditaetSum = 100;
        var grundsumme = $("#amvSlider").val();
        var progressionValue = '';

        progressionValue = $(".js-progression-select").val();


        leistung = progression[progressionValue][invaliditaetSum] / 100 * grundsumme;
        leistung = Math.round(leistung * 100) / 100;

        if (invaliditaetSum == 100 && progressionValue == '1000') {
            leistung += 100000;
            $('#textUnfallAktiv').show();
            $('#textMehrleistung').show();
        } else {
            $('#textUnfallAktiv').hide();
            $('#textMehrleistung').hide();
        }

        $('#invaliditaet').html(invaliditaetSum);
        $('#leistung').html(addDots(leistung));

    }

    /*
     *
     *     Helper Funktionen
     *
     */

    function setBoxSelection(boxId, gliedId) {
        var optionId = glieder[gliedId].optionId;

        // option als selected anzeigen
        $(boxId).find("[data-id='" + optionId + "']").prop('selected', true);

        // data attribute des select-elements aktualisieren
        $(boxId).data('selectedOption', optionId);
        $(boxId).data('gliedId', gliedId);
        $(boxId).data('groupId', glieder[gliedId].group);

        $(boxId).selectpicker('refresh');
    }

    function deselectBox(boxId) {
        // data attribute des select-elements aktualisieren
        $(boxId).data('selectedOption', 0);
        $(boxId).data('gliedId', 0);
        $(boxId).data('groupId', 0);

        $(boxId).selectpicker('deselectAll');

        lastSelectedGlied[boxId] = false;
    }

    function checkKidney() {

        var boxesWithKidney = [];
        $.each(selectBoxes, function (i, selectId) {
            var selectBox = $(selectId);

            if (selectBox.data('gliedId') == 46 || selectBox.data('gliedId') == 47) {
                boxesWithKidney.push(selectId);
            }
        });

        if (boxesWithKidney.length > 1) {
            // two kidenys selected
            $.each(boxesWithKidney, function (i, selectId) {
                var selectBox = $(selectId);
                var selectedOption = $(selectBox).find('option:selected');

                $(selectedOption).data('name', 'Verlust beider Nieren, je Niere');
                $(selectedOption).data('tax', '50');
                $(selectedOption).html('Verlust beider Nieren, je Niere 50%');

                $(selectBox).selectpicker('refresh');
            });
        } else if (boxesWithKidney.length == 1) {
            // Reset to single kidney in visible option
            var selectBox = $(boxesWithKidney[0]);
            var selectedOption = $(selectBox).find("[data-id='20']");

            $(selectedOption).data('name', 'Verlust einer Niere');
            $(selectedOption).data('tax', '25');
            $(selectedOption).html('Verlust einer Niere 25%');

            $(selectBox).selectpicker('refresh');

            // reset all other options
            $.each(selectBoxes, function (i, selectId) {
                var selectBox = $(selectId);
                var selectedOption = $(selectBox).find("[data-id='20']");

                $(selectedOption).data('name', 'Verlust einer Niere');
                $(selectedOption).data('tax', '25');
                $(selectedOption).html('Verlust einer Niere 25%');
            });
        }

    }

    function getFirstEmptySelectBox() {

        var foundEmptyBox = false;
        var emptyBoxId;

        // Erste leere selectBox finden
        $.each(selectBoxes, function (i, selectId) {
            if (foundEmptyBox) return;
            var selectBox = $(selectId);
            var selectedOption = $(selectBox).find('option:selected');

            // Selectbox ist leer -> zur Befüllung auswählen
            if (selectedOption.val() == "") {
                emptyBoxId = selectId;
                foundEmptyBox = true;
            }
        });

        return emptyBoxId;
    }

    function getBoxesWhereElementOfGroupsIsSelected(gliedId) {

        // Merge der IDs der gruppe, children und parent-gruppe
        var mergedIds = [];

        if (glieder[gliedId].group) {
            var groupId = glieder[gliedId].group;
            var group = groups[groupId];

            if (group.singleSelect) {
                mergedIds = mergedIds.concat(group.gliederIDs);

                // Hat group children?
                if (group.children) {
                    mergedIds = mergedIds.concat(group.children);
                }
            }

        }

        if (glieder[gliedId].parentGroup) {
            var parentGroupId = glieder[gliedId].parentGroup;
            var parentGroup = groups[parentGroupId];

            mergedIds = mergedIds.concat(parentGroup.gliederIDs);
        }

        var selectedInBox = false;
        var boxesFound = [];

        // Durchsucht alle Boxen ob schon ein Glied der gruppe, child-gruppe oder parent-gruppe selected wurde
        $.each(selectBoxes, function (i, selectId) {
            var selectBox = $(selectId);
            var selectedGlied = parseInt($(selectBox).data('gliedId'));


            // ist ausgewählter Wert ist in gesammelten Ids? -> Dann richtige selectBox
            if (mergedIds.indexOf(selectedGlied) != -1) {
                selectedInBox = selectId;
                boxesFound.push(selectId);
                return;
            }
        });

        return boxesFound;
    }

    // Slider
    var mySlider = $("#amvSlider").slider();
    /*$("#amvSlider").on("slide", function (slideEvt) {
		var newSum = addDots(slideEvt.value);
		console.log("##", slideEvt.value.newValue, slideEvt);
		$("#sliderVal").text(newSum + " €");
        calcResults();
	});*/
	$("#amvSlider").on("change", function (slideEvt) {
		//console.log("++", slideEvt.value.newValue, slideEvt);
		var newSum = addDots(slideEvt.value.newValue);
		$("#sliderVal").text(newSum + " €");
        calcResults();
	});

    function addDots(nStr) {
        nStr += '';
        x = nStr.split('.');
        x1 = x[0];
        x2 = x.length > 1 ? ',' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + '.' + '$2');
        }
        return x1 + x2;
    }

    /*
     *
     *     Image maps
     *
     */

    $(".glied-area").on("touchstart click", function (e) {

        e.preventDefault();
        var gliedId = $(this).attr('id').slice(6, -5);

        if (glieder[gliedId].selected) {

            deSelectByImage = true;
            gliedDeSelect(gliedId);

            calcResults();

        } else {

            /*
             *   Select über Bild
            */


            // Ist ein Glied der Gruppe oder Children oder Parent selektiert -> select auf bei Anzahl 5 erlauben
            var siblingIsSelected = false;
            var glied = glieder[gliedId];

            if (glied.group) {
                var group = groups[glied.group];

                if (group.singleSelect) {
                    // Andere Bilder der Gruppe verstecken, wenn singleSelect-Gruppe
                    $.each(group.gliederIDs, function (i, groupGliedId) {
                        if (glieder[groupGliedId].selected) siblingIsSelected = true;
                    });
                }

                if (group.children) {
                    // Child-Glieder der Gruppe verstecken
                    $.each(group.children, function (i, childGliedId) {
                        if (glieder[childGliedId].selected) siblingIsSelected = true;
                    });
                }
            }

            if (glied.parentGroup) {
                var parentGroup = groups[glied.parentGroup]
                // Glieder der Parent-Gruppe verstecken
                $.each(parentGroup.gliederIDs, function (i, parentGliedId) {
                    if (glieder[parentGliedId].selected) siblingIsSelected = true;
                });
            }

            if (selectedGliedCount >= gliedLimit && !siblingIsSelected) {
                $('.alert-to-many').show();
                setTimeout(function () {
                    $('.alert-to-many').fadeOut();
                }, 2700);
                return;
            }


            var boxWithGroupElements = getBoxesWhereElementOfGroupsIsSelected(gliedId);
            var chosenBoxId;

            if (boxWithGroupElements.length > 0) {

                // Erste gefundene Box auswählen
                chosenBoxId = boxWithGroupElements[0];

                // Die anderen Boxen leeren
                $.each(boxWithGroupElements, function (i, selectId) {

                    // IDs der Glieder der Boxen wieder in possibleIDs aufnehmen
                    var glied = glieder[$(selectId).data('gliedId')];
                    $.each(glied.affectedIds, function (i, id) {
                        var idx = possibleIds.indexOf(id);
                        if (idx == -1) {
                            possibleIds.push(id);
                        }
                    });

                    if (i == 0) return;
                    deselectBox(selectId);
                });

            } else {
                chosenBoxId = getFirstEmptySelectBox();
            }

            var group = glieder[gliedId].group;

            // GruppenBild in Vergrößerung aktivieren (wenn "hasBigImage", sonst verbergen)
            if (glieder[gliedId].hasBigImage) {
                $('.glied-big-group-' + group).show();
            } else {
                $('.glied-big-group-' + group).hide();
            }

            gliedSelect(gliedId);
            setBoxSelection(chosenBoxId, gliedId);

            lastSelectedGlied[chosenBoxId] = gliedId;

            checkKidney();

            calcResults();

            // Verzögern für bessere Performance
            setTimeout(function () {
                cleanUpSelectBoxes();
            }, 100);
        }

        // _showSelected();
    });

    $(".lupe-area").on("touchstart click", function (e) {
        e.preventDefault();
        var lupeId = $(this).attr('id').slice(0, -5);

        $("#" + lupeId).show();
        $("#" + lupeId + "-map-container").show();

    });

    $(".lupe-close-area").on("touchstart click", function (e) {
        e.preventDefault();
        var lupeId = $(this).attr('id').slice(0, -6);

        $("#" + lupeId).hide();
        $("#" + lupeId + "-map-container").hide();

    });

    $(".js-progression-select").on("change", function (e) {
		__update_progression_select();
	});
	
	function __update_progression_select()
	{
		var progressionValue = $(".js-progression-select").val();
        var thousandText = $('.thousand-text');

        calcResults();

        if (progressionValue === '1000') {
            thousandText.show();
        } else {
            thousandText.hide();
        }
	}

    $('input[type=radio][name=type]').change(function () {
        resetAllActiveParts();

        // Remove Options
        removeOptionsHTML();

        // Fill select with new options
        if (this.value == '0') {
            fillSelectBoxes(false);
        }
        else if (this.value == '1') {
            fillSelectBoxes(true); // Add New Options
        }

        // Refresh Select
        refreshAllSelects();

        // Calculate
        calcResults();
    });

    /* INIT */
    fillSelectBoxes();
	initSelectBoxes();
	initProgression('1000');
});