      <div style="margin-left: 96px;">
        <div style="display: flex; align-items: center;">
          <div style="font-size: 24px;">Monthly</div>

          <CreateMonthly
            let:setIsPopupOpen
            defaultOrderValue={sortedMonthlyTasks.length}
          >
           <!-- svelte-ignore a11y-click-events-have-key-events -->
            <span
              on:click={() => setIsPopupOpen({ newVal: true })}
              class="add-reusable-task-button"
            >
              +
            </span>
          </CreateMonthly>
        </div>

        {#each sortedMonthlyTasks as periodicTask, i (periodicTask.id)}
          {#if i === 0}
            <ReusableSimpleDropzone
              on:new-order-value={(e) => updateOrderOfDraggedTemplate(e.detail)}
              aboveOrder={0}
              belowOrder={periodicTasks[0].orderValue}
            />
            <!-- general case drop-zone: must be between 2 tasks-->
          {:else if i > 0 && i < periodicTasks.length}
            <ReusableSimpleDropzone
              on:new-order-value={(e) => updateOrderOfDraggedTemplate(e.detail)}
              aboveOrder={periodicTasks[i - 1].orderValue}
              belowOrder={periodicTasks[i].orderValue}
            />
          {/if}

          <MonthlyPopup
            let:setIsPopupOpen
            monthlyTemplate={periodicTask}
          >
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div
              class="monthly-periodic-task"
              on:click={() => setIsPopupOpen({ newVal: true })}
            >
              <div
                style="display: flex; align-items: center; position: relative;"
              >
                <div
                  style="position: relative; width: 94px; height: 20px; display: flex; align-items: center;"
                >
                  <div
                    style="position: relative; width: 94px; height: 1px; background-color: #ccc; display: flex; align-items: center;"
                  >
                    <span class="tick start"></span>
                    <span class="tick end"></span>
                  </div>

                  <!-- orange circle dots -->
                  <div
                    style="position: absolute; display: flex; width: 90px; outline: 0px solid red; align-items: center;"
                  >
                    {#each Array(27) as _, i}
                      {#if periodicTask.repeatOnDayOfMonth[i]}
                        <div
                          style="width: 6px; height: 6px; border: 0px solid black; border-radius: 8px;
                            position: absolute; 
                            left: {3 * i}px
                          "
                          class="highlighted"
                        ></div>
                      {/if}
                    {/each}

                    {#if periodicTask.willRepeatOnLastDay}
                      <div
                        style="width: 6px; height: 6px; border: 0px solid black; border-radius: 8px;
                          position: absolute; left: {3 * 30}px
                        "
                        class="highlighted"
                      ></div>
                    {/if}
                  </div>
                </div>
                <!-- end of visual representation -->

                <div
                  style="margin-left: 12px; cursor: pointer;"
                  draggable="true"
                  on:dragstart|self={(e) => dragstart_handler(e, periodicTask)}
                >
                  <!-- {periodicTask.orderValue} -->
                  {periodicTask.name}
                </div>
              </div>
            </div>
          </MonthlyPopup>

          {#if i === sortedMonthlyTasks.length - 1}
            <ReusableSimpleDropzone
              on:new-order-value={(e) => updateOrderOfDraggedTemplate(e.detail)}
              aboveOrder={sortedMonthlyTasks[i].orderValue}
              belowOrder={sortedMonthlyTasks[i].orderValue + 1}
            />
          {/if}
        {/each}
      </div>